import { STREAM_OPTIONS_DEFAULTS } from '../constants/stream-options-defaults';
import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamOptions } from '../interfaces/logger-stream-options';

export class StreamConsole implements ILoggerStream {

  private options: any;

  constructor (options: ILoggerStreamOptions) {
    this.options = Object.assign({}, STREAM_OPTIONS_DEFAULTS, options);
  }

  public write (level: string, message: string, data: any, dump: any) {
    if (message && this.options.message) {
      // @ts-ignore
      console[level as string](message);
    }
    if (data && this.options.prettyJson !== false) {
      // @ts-ignore
      console[level](JSON.stringify(data, undefined, this.options.prettyJson));
    } else if (data) {
      // @ts-ignore
      console[level](data);
    }
    if (dump && this.options.dump) {
      // @ts-ignore
      console[level](dump + '\n');
    }
  }
}
