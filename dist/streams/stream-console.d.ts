import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamOptions } from '../interfaces/logger-stream-options';
export declare class StreamConsole implements ILoggerStream {
    private options;
    constructor(options: ILoggerStreamOptions);
    write(level: string, message: string, data: any, dump: any): void;
}
//# sourceMappingURL=stream-console.d.ts.map