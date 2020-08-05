const registry = require('../../src/api/windows/registry')(
  'prueba_test',
  '1.0.1'
);
const { expect } = require('chai');

describe('isProgramPreviouslyInstalled function', () => {
  describe('"isProgramPreviouslyInstalled"', () => {
    it('should export a function', () => {
      expect(registry.isProgramPreviouslyInstalled).to.be.a('function');
    });
    it('is first called should return false', () => {
      registry.deleteInstallation();
      expect(registry.isProgramPreviouslyInstalled()).to.be.false;
    });
    it('is called after the function "registerProgram" should return true', () => {
      expect(registry.registerProgram('ABCDFEG')).to.be.true;
      expect(registry.getUUIDProgram()).to.be.equal('ABCDFEG');
      expect(registry.isProgramPreviouslyInstalled()).to.be.true;
    });
  });
});
