const registry = require('../../src/api/windows/registry')(
  'prueba_test',
  '1.0.1'
);
const { expect } = require('chai');

describe('deleteInstallation function', () => {
  describe('"deleteInstallation"', () => {
    it('should export a function', () => {
      expect(registry.deleteInstallation).to.be.a('function');
    });
    it('is called after the function "registerProgram" should return true', () => {
      expect(registry.registerProgram('ABCDFEG')).to.be.true;
      expect(registry.getUUIDProgram()).to.be.equal('ABCDFEG');
      expect(registry.deleteInstallation()).to.be.true;
    });
    it('is called and there is no previous installation', () => {
      if (
        registry.isProgramPreviouslyInstalled() ||
        registry.thereIsAnotherVersionInstalled()
      ) {
        expect(registry.deleteInstallation()).to.be.true;
      }
      expect(registry.deleteInstallation()).to.be.false;
    });
  });
});
