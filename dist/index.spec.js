"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
require("mocha");
require("sinon");
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const index_1 = require("./index");
const expect = chai.expect;
chai.use(sinon_chai_1.default);
chai.use(chai_as_promised_1.default);
chai.use(sinon_chai_1.default);
describe('monkfish-logger', function t() {
    it('should expose the expected units', function t() {
        expect(index_1.Logger).to.be.a('function');
        expect(index_1.StreamConsole).to.be.a('function');
        expect(index_1.StreamFile).to.be.a('function');
        expect(index_1.StreamBunyan).to.be.a('function');
    });
});
//# sourceMappingURL=index.spec.js.map