'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const Logger = require('../src/index');

describe('Logger', function () {
  it('should be a function', function () {
    expect(Logger).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.spy = sinon.spy();
    });

    it('should...', function () {
      expect(true).to.equal(true);
    });
  });
});
