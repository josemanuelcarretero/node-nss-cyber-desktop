const Many = require('extends-classes');
const crypto = require('crypto');
const ForegroundListener = require('./modules/interfaces/foreground_interface');
const RegisterListener = require('./modules/interfaces/register_interface');
const ForegroundModule = require('./modules/modules/foreground_module');
const RegisterModule = require('./modules/modules/register_module');

class App extends Many(ForegroundListener, RegisterListener) {
  constructor() {
    super();
    this.foregroundModule = new ForegroundModule(this);
    this.registerModule = new RegisterModule(this);
    this.uuid = null;
  }

  start() {
    this.registerModule.checkInstallation();
  }

  stop() {}

  onFocusedProcess(name, date) {
    console.info('onFocusedProcess', date, this.uuid, name);
  }

  onReleasedResources() {}

  onRegisteredProcess(uuid) {
    this.uuid = uuid;
    this.foregroundModule.start();
  }

  onUnregisteredProcess() {
    this.registerModule.registerVersion(crypto.randomBytes(16).toString('hex'));
  }

  onMismatchVersionProcess(uuid, version) {
    // Here you can compare versions and create migrations
    // if(version === "0.0.1")
    this.registerModule.registerVersion(uuid);
  }
}
module.exports = App;
