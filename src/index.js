'use strict';

const bunyan = require('bunyan');
// const bsyslog = require('bunyan-syslog');

function errSerializer (err) {
  if (typeof err === 'string') {
    return {
      name: err
    };
  } else if (err && err.constructor && err.constructor.name === 'ServiceError') {
    const ret = {
      name: err.name,
      severity: err.severity
    };
    if (err.details) {
      ret.details = err.details;
    }
    if (err.parent) {
      ret.parent = errSerializer(err.parent);
    }
    ret.trace = err.stack.split('\n').splice(1, err.stack.length).map(entry => entry.trim());
    return ret;
  } else if (err instanceof Error) {
    return {
      name: err.name || 'Error',
      message: err.message,
      trace: err.stack.split('\n').splice(1, err.stack.length).map(entry => entry.trim())
    };
  } else {
    return err;
  }
}

function makeErrorLogger (logger) {
  const _error = logger.error.bind(logger);
  return function () {
    const data = arguments[0];
    const message = arguments[1];
    const error = typeof data === 'object' && data.err;
    const severity = (error && error.severity);
    if (!severity || severity === 'error' || !this[severity]) {
      return _error(data, message);
    } else {
      logger[severity](data, message);
    }
  };
}

class LoggerAdapter {
  constructor (name, config) {
    config = config || {};

    const streams = [];

    if (config.stdout) {
      streams.push({
        level: config.stdout.level || config.level,
        stream: process.stdout
      });
    }

    if (config.file) {
      if (config.path) {
        streams.push({
          level: config.file.level || config.level,
          path: config.file.path
        });
      }

      if (config.file.errorPath) {
        streams.push({
          level: 'error',
          path: config.file.errorPath
        });
      }
    }

    if (config.syslog) {
      streams.push({
        level: config.syslog.level || config.level,
        type: 'raw'
        // stream: bsyslog.createBunyanStream({
        //   type: 'sys',
        //   facility: bsyslog.local3,
        //   name: config.syslog.name,
        //   host: config.syslog.host || '192.168.0.1',
        //   port: config.syslog.port || 514
        // })
      });
    }

    const logger = bunyan.createLogger({
      name: name,
      serializers: {
        err: errSerializer
      },
      streams: streams
    });

    logger.error = makeErrorLogger(logger);

    const _child = logger.child.bind(logger);
    logger.child = function (fields, preserve) {
      const child = _child(fields, preserve);
      child.error = makeErrorLogger(child);
      return child;
    };

    return logger;
  }
}

module.exports = LoggerAdapter;
