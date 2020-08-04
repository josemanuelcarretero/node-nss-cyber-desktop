const foregroundHandler = require('foreground-process');

class ForegroundModule {
  constructor(listener) {
    this.listener = listener;
    this.exitNow = false;
  }

  start() {
    foregroundHandler.start((action, name) => {
      if (action === 'focused_process') {
        this.listener.onFocusedProcess(name, new Date().toISOString());
      } else if (action === 'interrupt' || action === 'error') {
        // Relaunch the foregroundHandler in case of an unexpected error
        foregroundHandler.stop();
        setTimeout(() => this.start(), 500);
      } else if (action === 'stop') {
        if (this.exitNow) {
          this.listener.onReleasedResources();
        }
      }
    });
  }

  stop() {
    this.exitNow = true;
    foregroundHandler.stop();
  }
}

module.exports = ForegroundModule;
