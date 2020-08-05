const { name, version } = require('../../../../../package.json');
const registry = require('../../../windows/registry')(name, version);

class RegisterModule {
  constructor(listener) {
    this.listener = listener;
  }

  checkInstallation() {
    if (registry.thereIsAnotherVersionInstalled()) {
      this.listener.onMismatchVersionProcess(
        registry.getUUIDProgram(),
        registry.getVersionProgram()
      );
    } else if (registry.isProgramPreviouslyInstalled()) {
      this.listener.onRegisteredProcess(registry.getUUIDProgram());
    } else {
      this.listener.onUnregisteredProcess();
    }
  }

  registerVersion(UUID) {
    registry.registerProgram(UUID);
    this.checkInstallation();
  }
}
module.exports = RegisterModule;
