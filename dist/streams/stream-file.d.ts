import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamDefinition } from '../interfaces/logger-stream-definition';
import { ILoggerStreamOptions } from '../interfaces/logger-stream-options';
export interface ILoggerStreamFileConfig extends ILoggerStreamDefinition {
    file?: string;
}
export declare class StreamFile implements ILoggerStream {
    private config;
    private options;
    constructor(config: ILoggerStreamFileConfig, options: ILoggerStreamOptions);
    write(level: string, message: string, data: any, dump: any): void;
}
//# sourceMappingURL=stream-file.d.ts.map