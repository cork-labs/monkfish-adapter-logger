'use strict';

const fs = require('fs');

const streamDefaults = {
  file: null
};

const optionsDefaults = {
  message: false,
  prettyJson: 0,
  dump: false
};
class OutFile {
  constructor (config, options) {
    this._config = Object.assign({}, streamDefaults, config);
    this._options = Object.assign({}, optionsDefaults, options);
  }

  write (level, message, data, dump) {
    const args = [];
    if (message && this._options.message) {
      args.push(message);
    }
    if (this._options.prettyJson !== false) {
      data = JSON.stringify(data, undefined, this._options.prettyJson);
    }
    args.push(data);
    if (dump && this._options.dump) {
      args.push(dump + '\n');
    }
    let text = args.join('\n') + '\n';
    fs.writeFileSync(this._config.file, text, { flag: 'a' });
  }
}

module.exports = OutFile;
