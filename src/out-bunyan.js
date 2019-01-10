'use strict';

const bunyan = require('bunyan');

class OutFile {
  constructor (name, config, options) {
    this._config = config;
    this._options = options;

    const opts = Object.assign({ name }, config.bunyan);
    this._bunyan = bunyan.createLogger(opts);
    // https://github.com/trentm/node-bunyan/issues/462
    this._bunyan._emit = (rec, noemit) => {
      // delete rec.v;
      // delete rec.msg;
      // delete rec.name;
      // delete rec.time;
      // delete rec.hostname;
      // delete rec.pid;
      bunyan.prototype._emit.call(this._bunyan, rec, noemit);
    };
  }

  write (level, message, data, dump) {
    if (dump && this._options.dump) {
      data.dump = dump;
    }
    this._bunyan[level](data);
  }
}

module.exports = OutFile;
