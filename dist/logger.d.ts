import { ILogger } from './interfaces/logger';
import { ILoggerConfig } from './interfaces/logger-config';
import { ILoggerStream } from './interfaces/logger-stream';
declare class Logger implements ILogger {
    static create: (config: ILoggerConfig, data?: any) => Logger;
    static flat: (prefix: string | undefined, data: any, ret?: any) => any;
    private static createStream;
    private name;
    private streams;
    private data;
    constructor(name: string, streams: ILoggerStream[], data: any);
    set(key: string, value: any): void;
    child(childData?: any): Logger;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, data?: any, err?: any): void;
    private log;
}
export { Logger };
//# sourceMappingURL=logger.d.ts.map