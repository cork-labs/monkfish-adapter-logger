"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = require("bunyan");
const stream_options_defaults_1 = require("../constants/stream-options-defaults");
class StreamBunyan {
    constructor(name, config) {
        this.config = Object.assign({}, stream_options_defaults_1.STREAM_OPTIONS_DEFAULTS, config);
        const opts = Object.assign({ name }, this.config.bunyan);
        this.bunyan = bunyan_1.createLogger(opts);
        // https://github.com/trentm/node-bunyan/issues/462
        this.bunyan._emit = (rec, noemit) => {
            // @todo configurable blacklist/alias
            // delete rec.v;
            // delete rec.msg;
            // delete rec.name;
            // delete rec.time;
            // delete rec.hostname;
            // delete rec.pid;
            delete rec.msg;
            this.bunyan.__proto__._emit.call(this.bunyan, rec, noemit);
        };
    }
    write(level, message, data, dump) {
        this.bunyan[level](data);
    }
}
exports.StreamBunyan = StreamBunyan;
//# sourceMappingURL=stream-bunyan.js.map