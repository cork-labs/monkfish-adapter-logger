import * as fs from 'fs';

import { STREAM_OPTIONS_DEFAULTS } from '../constants/stream-options-defaults';
import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamDefinition } from '../interfaces/logger-stream-definition';
import { ILoggerStreamOptions } from '../interfaces/logger-stream-options';

export interface ILoggerStreamFileConfig extends ILoggerStreamDefinition {
  file?: string;
}

const streamDefaults = {
  file: null
};

export class StreamFile implements ILoggerStream {

  private config: any;
  private options: any;

  constructor (config: ILoggerStreamFileConfig, options: ILoggerStreamOptions) {
    this.config = Object.assign({}, streamDefaults, config);
    this.options = Object.assign({}, STREAM_OPTIONS_DEFAULTS, options);
  }

  public write (level: string, message: string, data: any, dump: any) {
    const args = [];
    if (message && this.options.message) {
      args.push(message);
    }
    if (data && this.options.prettyJson !== false) {
      args.push(JSON.stringify(data, undefined, this.options.prettyJson));
    } else if (data) {
      args.push(data);
    }
    if (dump && this.options.dump) {
      args.push(dump + '\n');
    }
    const text = args.join('\n') + '\n';
    fs.writeFileSync(this.config.file, text, { flag: 'a' });
  }
}
