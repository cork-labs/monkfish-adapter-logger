
export interface ILoggerStream {
  write (level: string, message: string, data: any, dump: any): void;
}
