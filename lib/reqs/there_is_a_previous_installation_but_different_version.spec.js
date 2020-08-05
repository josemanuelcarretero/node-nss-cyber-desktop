const registry = require('../../src/api/windows/registry')(
  'prueba_test',
  '1.0.1'
);
const anotherRegistry = require('../../src/api/windows/registry')(
  'prueba_test',
  '1.0.0'
);
const { expect } = require('chai');

describe('thereIsAnotherVersionInstalled function', () => {
  describe('"thereIsAnotherVersionInstalled"', () => {
    it('should export a function', () => {
      expect(registry.thereIsAnotherVersionInstalled).to.be.a('function');
    });
    it('is first called should return false', () => {
      registry.deleteInstallation();
      expect(registry.thereIsAnotherVersionInstalled()).to.be.false;
    });
    it('is called after the function "registerProgram" with different version should return true', () => {
      expect(anotherRegistry.registerProgram('ABCDFEG')).to.be.true;
      expect(anotherRegistry.getUUIDProgram()).to.be.equal('ABCDFEG');
      expect(registry.thereIsAnotherVersionInstalled()).to.be.true;
    });
    it('is called after the function "registerProgram" with same version should return false', () => {
      expect(registry.registerProgram('ABCDFEG')).to.be.true;
      expect(registry.getUUIDProgram()).to.be.equal('ABCDFEG');
      expect(registry.thereIsAnotherVersionInstalled()).to.be.false;
    });
  });
});
