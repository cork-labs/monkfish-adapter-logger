import { ILoggerStream } from '../interfaces/logger-stream';
import { ILoggerStreamDefinition } from '../interfaces/logger-stream-definition';
export interface ILoggerStreamBunyanConfig extends ILoggerStreamDefinition {
    bunyan: any;
}
export declare class StreamBunyan implements ILoggerStream {
    private config;
    private bunyan;
    constructor(name: string, config: ILoggerStreamBunyanConfig);
    write(level: string, message: string, data: any, dump: any): void;
}
//# sourceMappingURL=stream-bunyan.d.ts.map