export interface ILogger {
  set (key: string, value: any): void;
  child (childData: any): ILogger;
  debug (message: string, data?: any): void;
  info (message: string, data?: any): void;
  warn (message: string, data?: any): void;
  error (message: string, data ?: any, err ?: any): void;
  flat (prefix: string, data: any, ret?: any): any;
}
