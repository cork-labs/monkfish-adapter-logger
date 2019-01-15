import { createLogger } from 'bunyan';

import { STREAM_OPTIONS_DEFAULTS } from '../constants/stream-options-defaults';
import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamDefinition } from '../interfaces/logger-stream-definition';

export interface ILoggerStreamBunyanConfig extends ILoggerStreamDefinition {
  bunyan: any;
}

export class StreamBunyan implements ILoggerStream {

  private config: any;
  private bunyan: any;

  constructor (name: string, config: ILoggerStreamBunyanConfig) {
    this.config = Object.assign({}, STREAM_OPTIONS_DEFAULTS, config);

    const opts = Object.assign({ name }, this.config.bunyan);
    this.bunyan = createLogger(opts);
    // https://github.com/trentm/node-bunyan/issues/462
    this.bunyan._emit = (rec: any, noemit: any) => {
      // @todo configurable blacklist/alias
      // delete rec.v;
      // delete rec.msg;
      // delete rec.name;
      // delete rec.time;
      // delete rec.hostname;
      // delete rec.pid;
      delete rec.msg;
      this.bunyan.__proto__._emit.call(this.bunyan, rec, noemit);
    };
  }

  public write (level: string, message: string, data: any, dump: any) {
    this.bunyan[level](data);
  }
}
