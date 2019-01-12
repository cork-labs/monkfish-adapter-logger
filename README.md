# Monkfish Adapter Logger

> Logger adapter for Node.js framework Monkfish.


## Getting Started

```shell
npm install --save @cork-labs/monkfish @cork-labs/monkfish-logger
```

Wraps [bunyan]() logger library to facilitate injection, testing and configuration of logs.

See [Monkfish](https://github.comn/cork-labs/monkfish) for more information.


## API

### Logger

#### `Logger.createLogger(config, data) : Logger`

Creates an instance of Logger from configuration.

- `config: object` - of stream instances (OutBunyan, OutConsole, OutFile).
- `data: object (optional)` - permanent log fields (tip: keep it flat).

Example config:
```javascript
{
  name: 'my-app',
  streams: [
    // append to file (does not create directories, will fail if dirs are missings)
    {
      type: 'file',
      path: './logs/test.log',
      options: { ... } // override options for this stream only
    },
    {
      type: 'bunyan',
      bunyan: { /* Bunyan nativate options */ },
      // options: { ... } are ignored in bunyan stream
    },
    // for debug purposes only, do not use in production
    {
      type: 'console',
      // override options for this stream, e.g.: make console more human friendly
      options: {
        message: true,
        prettyJson: 2,
        dump: true
      }
    },
  ],
  // options for all streams
  options: {
    message: false, // log an extra line with a human readable message before the json payload
    prettyJson: 0, // format json payload (multi-line)
    dump: false // output error stack traces after payload (multi-line)
  }
}
```

#### `Logger.flat(prefix, obj, ret): object`

Flattens the object for logging, use on data objects before you log them to keep them flat.

Also accessible as instance method `logger.flat()`, see below for spec and examples.

#### `new Logger(name, streams)`

Creates an instance of Logger with the pre-configured stream instances.

- `name: string` - added to the log fields as `log_n`
- `streams: array` - of stream instances (OutBunyan, OutConsole, OutFile).
- `data: object (optional)` - permanent log fields (tip: keep it flat).

#### `logger.child(data): Logger`

Returns a new logger, containing all the parent configuration and context, plus the provided optional data.

- `data: object (optional)` - additional permanent log fields (tip: keep it flat).

#### `logger.set(key, value): void`

Adds key/value to permanent fields data or removes key when value not provided.

Avoid adding objects, keep it flat.

- `key: string`
- `value: any (optional)` - If value not provided (or undefined is provided), removes key from permanent fields.

#### `logger.debug('message', data): void`

Logs a debug level message, with adittional optional fields.

#### `logger.info(message, data): void`

Logs an info level message, with adittional optional fields.

- `message: string` - logged as `log_m`.
- `data: object (optional)` - additional fields for this log message only.

#### `logger.warn('message', data): void`

Logs an warning level message, with adittional optional fields.

- `message: string` - logged as `log_m`.
- `data: object (optional)` - additional fields for this log message only.

#### `logger.error('message', data, err): void`

Logs an error level message, with adittional optional fields, plus optional error (ideally a subclass of Error).

- `message: string` - logged as `log_m`.
- `data: object (optional)` - additional fields for this log message only.

If error is a subclass of Error, only the following key/values are added to the log.

- `err_name: err.constructor.name`
- `err_msg: err.message`
- `err_trace: err.stack`

Otherwise, it is directly logged under the `err` key.

#### `logger.flat(prefix, data, ret): object`

Flattens the object for logging, use on data objects before you log them to keep them flat.

- `prefix: string` - e.g. `user`.
- `data: object (optional)` - additional fields for this log message only.
- `ret: object (optional)` - if provided, fields are flattened into this object.

```javascript
// flattening one object
const flatUser = logger.flat('todo', todo);
logger.info('todo.created', data);

// { log_m: 'todo.created', ..., todo_id: ..., todo_title: ... }

// flattening two objects into one
const data = logger.flat('article', article, {});
logger.flat('tag', tag, data)
logger.info('article.tags.created', data);

// { log_m: 'article.tags.created', ..., todo_id: ..., todo_title: ..., tag_id: ..., tag_title: ... }
```


## Development

### Install dependencies

```
npm install -g nodemon http-server
```

### Code, test, publish

#### VSCode launchers:
- `test` - run tests once
- `./bin/svc` - debug server
- `./bin/svc (nodemon)` - debug with nodemon (restarts when files saved)

#### NPM scripts:
- `npm run dev` - run tests (restarts when files saved)
- `npm run lint` - lint and fix
- `npm test` - run all test suites and produce code coverage reports
- `npm run test-u` - run unit tests
- `npm run test-i` - run integration tests
- `npm run coverage` - serve test coverage reports
- `npm run build` - lint and test
- `npm run pub` - publish a patch version (use `npm-bump minor` to publish a minor version)


### Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Check [CONTRIBUTING](https://github.com/cork-labs/contributing/blob/master/CONTRIBUTING.md) before submitting issues and PRs.


## Links

- [npm-bump](https://www.npmjs.com/package/npm-bump)
- [chai](http://chaijs.com/api/)
- [sinon](http://sinonjs.org/)
- [sinon-chai](https://github.com/domenic/sinon-chai)


## [MIT License](LICENSE)

[Copyright (c) 2018 Cork Labs](http://cork-labs.mit-license.org/2018)
