const registry = require('../../src/api/windows/registry')(
  'prueba_test',
  '1.0.1'
);
const { expect } = require('chai');

describe('registerProgram function', () => {
  describe('"registerProgram"', () => {
    it('should export a function', () => {
      expect(registry.registerProgram).to.be.a('function');
    });
    it('is called should register the program in the windows registry', () => {
      expect(registry.registerProgram('ABCDFEG')).to.be.true;
      expect(registry.getUUIDProgram()).to.be.equal('ABCDFEG');
    });
  });
});
