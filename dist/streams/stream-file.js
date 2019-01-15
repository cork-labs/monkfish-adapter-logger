"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const stream_options_defaults_1 = require("../constants/stream-options-defaults");
const streamDefaults = {
    file: null
};
class StreamFile {
    constructor(config, options) {
        this.config = Object.assign({}, streamDefaults, config);
        this.options = Object.assign({}, stream_options_defaults_1.STREAM_OPTIONS_DEFAULTS, options);
    }
    write(level, message, data, dump) {
        const args = [];
        if (message && this.options.message) {
            args.push(message);
        }
        if (data && this.options.prettyJson !== false) {
            args.push(JSON.stringify(data, undefined, this.options.prettyJson));
        }
        else if (data) {
            args.push(data);
        }
        if (dump && this.options.dump) {
            args.push(dump + '\n');
        }
        const text = args.join('\n') + '\n';
        fs.writeFileSync(this.config.file, text, { flag: 'a' });
    }
}
exports.StreamFile = StreamFile;
//# sourceMappingURL=stream-file.js.map