"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_options_defaults_1 = require("../constants/stream-options-defaults");
class StreamConsole {
    constructor(options) {
        this.options = Object.assign({}, stream_options_defaults_1.STREAM_OPTIONS_DEFAULTS, options);
    }
    write(level, message, data, dump) {
        if (message && this.options.message) {
            // @ts-ignore
            console[level](message);
        }
        if (data && this.options.prettyJson !== false) {
            // @ts-ignore
            console[level](JSON.stringify(data, undefined, this.options.prettyJson));
        }
        else if (data) {
            // @ts-ignore
            console[level](data);
        }
        if (dump && this.options.dump) {
            // @ts-ignore
            console[level](dump + '\n');
        }
    }
}
exports.StreamConsole = StreamConsole;
//# sourceMappingURL=stream-console.js.map