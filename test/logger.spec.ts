'use strict';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import 'sinon';
import sinonChai from 'sinon-chai';

import { Logger } from '../src/index';

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Logger', function t () {
  it('should be a function', function t () {
    expect(Logger).to.be.a('function');
  });

  describe('create()', function t () {
    describe('out-file (defaults)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'file',
            file: './log/test.log'
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-file (extended)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'file',
            file: './log/test-file.log',
            options: {
              message: true,
              prettyJson: 2,
              dump: true
            }
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });
      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-console (defaults)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'console'
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-console (extended)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'console',
            options: {
              message: true,
              prettyJson: 2,
              dump: true
            }
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (defaults)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'bunyan'
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (extended stderr)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'bunyan',
            bunyan: {
              streams: [{
                stream: process.stderr,
                level: 'debug'
              }]
            },
            options: {
              message: true,
              prettyJson: 2,
              dump: true
            }
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (extended file)', function t () {
      beforeEach(function t () {
        this.config = {
          name: 'my-app',
          streams: [{
            type: 'bunyan',
            bunyan: {
              streams: [{
                path: './log/test-bunyan.log'
              }]
            },
            options: {
              message: true,
              prettyJson: 2,
              dump: true
            }
          }]
        };
        this.logger = Logger.create(this.config, { baz: 'qux' });
      });

      it('should log a debug message', function t () {
        this.logger.debug('some debug message', { foo: 'bar' });
      });

      it('should log an info message', function t () {
        this.logger.info('some info message', { foo: 'bar' });
      });

      it('should log a warning message', function t () {
        this.logger.warn('some warn message', { foo: 'bar' });
      });

      it('should log an error message', function t () {
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });
  });
});
