"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_bunyan_1 = require("./streams/stream-bunyan");
const stream_console_1 = require("./streams/stream-console");
const stream_file_1 = require("./streams/stream-file");
const defaults = {
    name: 'logger',
    streams: [],
    options: {
        message: false,
        prettyJson: 0,
        dump: false
    }
};
class Logger {
    constructor(name, streams, data) {
        this.name = name || 'logger';
        this.streams = streams;
        this.data = data;
    }
    static createStream(config, stream, options) {
        switch (stream.type) {
            case 'file':
                return new stream_file_1.StreamFile(stream, options);
            case 'console':
                return new stream_console_1.StreamConsole(options);
            case 'bunyan':
                return new stream_bunyan_1.StreamBunyan(config.name, stream);
            default:
                throw new Error(`Unknown stream type "${stream.type}".`);
        }
    }
    set(key, value) {
        if (typeof value !== 'undefined') {
            this.data[key] = value;
        }
        else {
            delete this.data[key];
        }
    }
    child(childData = {}) {
        const data = Object.assign({}, this.data, childData);
        const child = new Logger(this.name, this.streams, data);
        return child;
    }
    debug(message, data) {
        this.log('debug', message, data);
    }
    info(message, data) {
        this.log('info', message, data);
    }
    warn(message, data) {
        this.log('warn', message, data);
    }
    error(message, data, err) {
        const logData = data || {};
        if (err && err.constructor) {
            logData.errname = err.constructor.name;
            logData.err_msg = err.message;
            logData.err_trace = err.stack;
        }
        else if (err) {
            logData.err = err;
        }
        this.log('error', message, logData, err && err.stack);
    }
    flat(prefix = '', data, ret = {}) {
        return Logger.flat(prefix, data, ret);
    }
    log(level, message, data, dump) {
        // @todo configurable keys (and which to include)
        const rootData = {
            log_n: this.name,
            log_t: new Date(),
            log_l: level,
            log_m: message,
        };
        const logData = Object.assign(rootData, this.data, data);
        const LEVEL = level.toUpperCase();
        // @todo configurable format
        const messageStr = `> ${logData.log_n} | ${logData.log_t.toUTCString()} | ${LEVEL} | ${message}`;
        this.streams.forEach((stream) => {
            stream.write(level, messageStr, logData, dump);
        });
    }
}
Logger.create = (config, data = {}) => {
    const cfg = Object.assign({}, defaults, config);
    const streams = (cfg.streams || []).map((stream) => {
        const options = Object.assign({}, cfg.options, stream.options);
        return Logger.createStream(cfg, stream, options);
    });
    return new Logger(cfg.name, streams, data);
};
Logger.flat = (prefix = '', data, ret = {}) => {
    for (const key in data) {
        // @todo configurable nesting limit
        if (typeof data[key] === 'object') {
            Logger.flat(prefix + '_' + key, data[key], ret);
        }
        else {
            ret[prefix + '_' + key] = data[key];
        }
    }
    return ret;
};
exports.Logger = Logger;
Logger.create({
    name: 'foobar',
    streams: [],
    options: {}
});
//# sourceMappingURL=logger.js.map