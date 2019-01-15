import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import 'sinon';
import sinonChai from 'sinon-chai';

import { Logger, StreamBunyan, StreamConsole, StreamFile } from './index';

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('monkfish-logger', function t () {
  it('should expose the expected units', function t () {
    expect(Logger).to.be.a('function');
    expect(StreamConsole).to.be.a('function');
    expect(StreamFile).to.be.a('function');
    expect(StreamBunyan).to.be.a('function');
  });
});
