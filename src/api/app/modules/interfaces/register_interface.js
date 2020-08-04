class RegisterListener {
  onRegisteredProcess(uuid) {
    throw new Error('Must override this method');
  }

  onUnregisteredProcess() {
    throw new Error('Must override this method');
  }

  onMismatchVersionProcess(uuid, version) {
    throw new Error('Must override this method');
  }
}

module.exports = RegisterListener;
