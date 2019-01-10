'use strict';

const fs = require('fs');

class OutFile {
  constructor (config, options) {
    this._config = config;
    this._options = options;
  }

  write (level, message, data, dump) {
    const args = [];
    if (message && this._options.message) {
      args.push(message);
    }
    if (dump && this._options.dump) {
      data.dump = dump;
    }
    if (this._options.prettyJson !== false) {
      data = JSON.stringify(data, undefined, this._options.prettyJson);
    }
    args.push(data);
    if (dump && this._options.dump) {
      args.push(dump);
    }
    fs.writeFileSync(this._config.file, args.join('\n') + '\n', { flag: 'a' });
  }
}

module.exports = OutFile;
