import { ILoggerStreamDefinition } from './logger-stream-definition';
import { ILoggerStreamOptions } from './logger-stream-options';

export interface ILoggerConfig {
  name: string;
  streams: ILoggerStreamDefinition[];
  options: ILoggerStreamOptions;
}
