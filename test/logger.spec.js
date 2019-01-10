'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const Logger = require('../src/index').Logger;

describe('Logger', function () {
  it('should be a function', function () {
    expect(Logger).to.be.a('function');
  });

  describe('createLogger()', function () {
    describe('out-file (defaults)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
          streams: [{
            type: 'file',
            file: './log/test.log'
          }]
        };
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-file (extended)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
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
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-console (defaults)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
          streams: [{
            type: 'console'
          }]
        };
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-console (extended)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
          streams: [{
            type: 'console',
            options: {
              message: true,
              prettyJson: 2,
              dump: true
            }
          }]
        };
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (defaults)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
          streams: [{
            type: 'bunyan'
          }]
        };
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (extended stderr)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
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
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });

    describe('out-bunyan (extended file)', function () {
      beforeEach(function () {
        this.config = {
          name: 'blandoo-server',
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
        this.logger = Logger.createLogger(this.config, { baz: 'qux' });
      });

      it('should...', function () {
        this.logger.debug('some debug message', { foo: 'bar' });
        this.logger.info('some info message', { foo: 'bar' });
        this.logger.warn('some warn message', { foo: 'bar' });
        this.logger.error('some error message', { foo: 'bar' }, new Error('ouch'));
      });
    });
  });
});
