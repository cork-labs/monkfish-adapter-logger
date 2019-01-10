'use strict';

const OutConsole = require('./out-console');
const OutFile = require('./out-file');
const OutBunyan = require('./out-bunyan');

const defaults = {
  name: 'blandoo-server',
  streams: [],
  options: {
    message: false,
    prettyJson: 0,
    dump: false
  }
};

class Logger {
  constructor (config, streams, data) {
    this._config = Object.assign({}, defaults, config);
    this._name = this._config.name || 'logger';
    this._streams = streams;
    this._data = data;
  }

  _log (level, message, data, dump) {
    const rootData = {
      log_n: this._name,
      log_t: new Date(),
      log_l: level,
      log_m: message
    };
    const logData = Object.assign(rootData, this._data, data);
    const LEVEL = level.toUpperCase();
    message = `> ${logData.log_n} | ${logData.log_t.toUTCString()} | ${LEVEL} | ${message}`;

    this._streams.forEach((stream) => {
      stream.write(level, message, logData, dump);
    });
  }

  set (key, value) {
    if (typeof value !== 'undefined') {
      this._data[key] = value;
    } else {
      delete this._data[key];
    }
  }

  child (childData = {}) {
    const data = Object.assign({}, this._data, childData);
    const child = new Logger(this._config, this._streams, data);
    return child;
  };

  debug (message, data) {
    this._log('debug', message, data);
  };

  info (message, data) {
    this._log('info', message, data);
  };

  warn (message, data) {
    this._log('warn', message, data);
  };

  error (message, data, err) {
    data = data || {};
    if (err && err.constructor) {
      data.err_name = err.constructor.name;
      data.err_msg = err.message;
      data.err_trace = err.stack;
    } else if (err) {
      data.err = err;
    }
    this._log('error', message, data, err && err.stack);
  };

  flat (prefix = '', data, ret = {}) {
    for (let key in data) {
      if (typeof data[key] === 'object') {
        this.flat(prefix + '_' + key, data[key], ret);
      } else {
        ret[prefix + '_' + key] = data[key];
      }
    }
    return ret;
  }
}

Logger.createLogger = (config, data) => {
  const streams = (config.streams || []).map((stream) => {
    const options = Object.assign({}, config.options, stream.options);
    return Logger._createStream(config, stream, options);
  });
  return new Logger(config.name, streams, data);
};

Logger._createStream = (config, stream, options) => {
  switch (stream.type) {
    case 'file':
      return new OutFile(stream, options);
    case 'console':
      return new OutConsole(stream, options);
    case 'bunyan':
      return new OutBunyan(config.name, stream, options);
  }
};

module.exports = Logger;
