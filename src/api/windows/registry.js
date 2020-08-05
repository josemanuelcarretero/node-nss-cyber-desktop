const { registry, windef } = require('windows-registry-napi');

function getKeyORCreate(keyObject, subKeyName, accessLevel) {
  try {
    return registry.openKeyFromPredefined(keyObject, subKeyName, accessLevel);
  } catch (e) {
    const root = registry.openKeyFromPredefined(keyObject, '', accessLevel);
    const key = root.createSubKey(subKeyName, accessLevel);
    key.close();
    root.close();
    return getKeyORCreate(keyObject, subKeyName, accessLevel);
  }
}

module.exports = (namePackage, version) => {
  function isProgramPreviouslyInstalled() {
    const key = getKeyORCreate(
      windef.HKEY.HKEY_LOCAL_MACHINE,
      'SOFTWARE\\NSS\\'.concat(namePackage),
      windef.KEY_ACCESS.KEY_ALL_ACCESS
    );
    try {
      const value = key.getValue('Version');
      return value === version;
    } catch (e) {
      return false;
    } finally {
      key.close();
    }
  }

  function thereIsAnotherVersionInstalled() {
    const key = getKeyORCreate(
      windef.HKEY.HKEY_LOCAL_MACHINE,
      'SOFTWARE\\NSS\\'.concat(namePackage),
      windef.KEY_ACCESS.KEY_ALL_ACCESS
    );
    try {
      const value = key.getValue('Version');
      return value !== version;
    } catch (e) {
      return false;
    } finally {
      key.close();
    }
  }

  function registerProgram(uuid) {
    const key = getKeyORCreate(
      windef.HKEY.HKEY_LOCAL_MACHINE,
      'SOFTWARE\\NSS\\'.concat(namePackage),
      windef.KEY_ACCESS.KEY_ALL_ACCESS
    );
    try {
      key.setValue('Version', windef.REG_VALUE_TYPE.REG_SZ, version);
      key.setValue('UUID', windef.REG_VALUE_TYPE.REG_SZ, uuid);
      return true;
    } catch (e) {
      return false;
    } finally {
      key.close();
    }
  }

  function getDataProgram() {
    const key = getKeyORCreate(
      windef.HKEY.HKEY_LOCAL_MACHINE,
      'SOFTWARE\\NSS\\'.concat(namePackage),
      windef.KEY_ACCESS.KEY_ALL_ACCESS
    );
    try {
      return {
        UUID: key.getValue('UUID'),
        Version: key.getValue('Version'),
      };
    } catch (e) {
      return null;
    } finally {
      key.close();
    }
  }

  function deleteInstallation() {
    let installed = false;
    try {
      const key = registry.openKeyFromPredefined(
        windef.HKEY.HKEY_LOCAL_MACHINE,
        'SOFTWARE\\NSS\\'.concat(namePackage),
        windef.KEY_ACCESS.KEY_ALL_ACCESS
      );
      try {
        key.getValue('Version');
        installed = true;
      } catch (e) {
        // forcing throw execption if the key don't exits
      }
      try {
        key.getValue('UUID');
        installed = true;
      } catch (e) {
        // forcing throw execption if the key don't exits
      }
      key.close();
      if (installed) {
        const root = registry.openKeyFromPredefined(
          windef.HKEY.HKEY_LOCAL_MACHINE,
          'SOFTWARE\\NSS',
          windef.KEY_ACCESS.KEY_ALL_ACCESS
        );
        const handleError = (e) => {
          // rethrow of the error allowing to close the registration key
          throw e;
        };
        try {
          registry.deleteKey(root, namePackage);
        } catch (e) {
          handleError(e);
        } finally {
          root.close();
        }
      }
      return installed;
    } catch (e) {
      return false;
    }
  }
  const getUUIDProgram = () => (getDataProgram() || { UUID: null }).UUID;

  const getVersionProgram = () => (getDataProgram() || { UUID: null }).UUID;

  return {
    isProgramPreviouslyInstalled,
    thereIsAnotherVersionInstalled,
    registerProgram,
    getDataProgram,
    getUUIDProgram,
    getVersionProgram,
    deleteInstallation,
  };
};
