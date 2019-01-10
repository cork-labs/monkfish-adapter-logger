'use strict';

const streamDefaults = {};

const optionsDefaults = {
  message: false,
  prettyJson: 0,
  dump: false
};

class OutConsole {
  constructor (config, options) {
    this._config = Object.assign({}, streamDefaults, config);
    this._options = Object.assign({}, optionsDefaults, options);
  }

  write (level, message, data, dump) {
    if (message && this._options.message) {
      console[level](message);
    }
    if (this._options.prettyJson !== false) {
      data = JSON.stringify(data, undefined, this._options.prettyJson);
    }
    console[level](data);
    if (dump && this._options.dump) {
      console[level](dump + '\n');
    }
  }
}

module.exports = OutConsole;
