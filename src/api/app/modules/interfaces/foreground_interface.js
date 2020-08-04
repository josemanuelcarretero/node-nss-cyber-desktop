class ForegroundListener {
  onFocusedProcess(name, date) {
    throw new Error('Must override this method');
  }

  onReleasedResources() {
    throw new Error('Must override this method');
  }
}

module.exports = ForegroundListener;
