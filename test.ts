import * as lo from './src/logger';
import { LoggerLevel } from './src/types/logger-level';

const l = new lo.Logger('foo', [], {});

const log = (level: LoggerLevel) => {
  l[level]('ouch');
};

log('info');
