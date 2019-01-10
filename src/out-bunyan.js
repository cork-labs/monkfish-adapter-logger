'use strict';

const bunyan = require('bunyan');

const streamDefaults = {
  bunyan: {}
};

const optionsDefaults = {
  message: false,
  prettyJson: 0,
  dump: false
};

class OutBunyan {
  constructor (name, config, options) {
    this._config = Object.assign({}, streamDefaults, config);
    this._options = Object.assign({}, optionsDefaults, options);

    const opts = Object.assign({ name }, config.bunyan);
    this._bunyan = bunyan.createLogger(opts);
    // https://github.com/trentm/node-bunyan/issues/462
    this._bunyan._emit = (rec, noemit) => {
      // @todo configurable blacklist/alias
      // delete rec.v;
      // delete rec.msg;
      // delete rec.name;
      // delete rec.time;
      // delete rec.hostname;
      // delete rec.pid;
      delete rec.msg;
      bunyan.prototype._emit.call(this._bunyan, rec, noemit);
    };
  }

  write (level, message, data, dump) {
    this._bunyan[level](data);
  }
}

module.exports = OutBunyan;
