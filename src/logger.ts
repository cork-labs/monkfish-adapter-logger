import { ILoggerConfig } from './interfaces/logger-config';
import { ILoggerStream } from './interfaces/logger-stream';
import { ILoggerStreamDefinition } from './interfaces/logger-stream-definition';
import { ILoggerStreamOptions } from './interfaces/logger-stream-options';
import { ILoggerStreamBunyanConfig, StreamBunyan } from './streams/stream-bunyan';
import { StreamConsole } from './streams/stream-console';
import { ILoggerStreamFileConfig, StreamFile } from './streams/stream-file';

const defaults: ILoggerConfig = {
  name: 'logger',
  streams: [],
  options: {
    message: false,
    prettyJson: 0,
    dump: false
  }
};

class Logger {

  public static create = (config: ILoggerConfig, data: any = {}) => {
    const cfg = Object.assign({}, defaults, config);
    const streams = (cfg.streams || []).map((stream: ILoggerStreamDefinition) => {
      const options = Object.assign({}, cfg.options, stream.options);
      return Logger.createStream(cfg, stream, options);
    });
    return new Logger(cfg.name, streams, data);
  }

  public static flat = (prefix: string = '', data: any, ret: any = {}) => {
    for (const key in data) {
      // @todo configurable nesting limit
      if (typeof data[key] === 'object') {
        Logger.flat(prefix + '_' + key, data[key], ret);
      } else {
        ret[prefix + '_' + key] = data[key];
      }
    }
    return ret;
  }

  private static createStream (
    config: ILoggerConfig,
    stream: ILoggerStreamDefinition,
    options: ILoggerStreamOptions
  ): ILoggerStream {
    switch (stream.type) {
      case 'file':
        return new StreamFile(stream as ILoggerStreamFileConfig, options);
      case 'console':
        return new StreamConsole(options);
      case 'bunyan':
        return new StreamBunyan(config.name, stream as ILoggerStreamBunyanConfig);
      default:
        throw new Error(`Unknown stream type "${stream.type}".`);
    }
  }

  private name: string;
  private streams: any;
  private data: any;

  constructor (name: string, streams: ILoggerStream[], data: any) {
    this.name = name || 'logger';
    this.streams = streams;
    this.data = data;
  }

  public set (key: string, value: any) {
    if (typeof value !== 'undefined') {
      this.data[key] = value;
    } else {
      delete this.data[key];
    }
  }

  public child (childData: any = {}) {
    const data = Object.assign({}, this.data, childData);
    const child = new Logger(this.name, this.streams, data);
    return child;
  }

  public debug (message: string, data?: any) {
    this.log('debug', message, data);
  }

  public info (message: string, data?: any) {
    this.log('info', message, data);
  }

  public warn (message: string, data?: any) {
    this.log('warn', message, data);
  }

  public error (message: string, data?: any, err?: any) {
    const logData: any = data || {};
    if (err && err.constructor) {
      logData.errname = err.constructor.name;
      logData.err_msg = err.message;
      logData.err_trace = err.stack;
    } else if (err) {
      logData.err = err;
    }
    this.log('error', message, logData, err && err.stack);
  }

  private log (level: string, message: string, data: any, dump?: any) {
    // @todo configurable keys (and which to include)
    const rootData = {
      log_n: this.name,
      log_t: new Date(),
      log_l: level,
      log_m: message,
    };
    const logData = Object.assign(rootData, this.data, data);
    const LEVEL = level.toUpperCase();
    // @todo configurable format
    const messageStr = `> ${logData.log_n} | ${logData.log_t.toUTCString()} | ${LEVEL} | ${message}`;

    this.streams.forEach((stream: ILoggerStream) => {
      stream.write(level, messageStr, logData, dump);
    });
  }

}

Logger.create({
  name: 'foobar',
  streams: [],
  options: {}
});

export { Logger };
