/**
 * Check for Storage Access permission and request it if absent and possible
 *
 * @param {entity_id} [string] the entityID of the SAML identity provider to be
 *     removed
 */
export const requestingStorageAccess = (callback) => {
  if (document.hasStorageAccess) {
    // Check whether access has been granted using the Storage Access API.
    // Note on page load this will always be false initially so we could be
    // skipped in this example, but including for completeness for when this
    // is not so obvious.
    document.hasStorageAccess()
        .then(hasAccess => {
          if (!hasAccess) {
            document.requestStorageAccess()
                .then(storage => { callback(); })
                .catch(err => { callback(); });
          } else {
            navigator.permissions.query({name : 'storage-access'})
                .then(permission => {
                  if (permission) {
                    if (permission.state === 'granted') {
                      document.requestStorageAccess()
                          .then(storage => { callback(); })
                          .catch(err => { callback(); });
                    } else if (permission.state === 'prompt') {
                      document.requestStorageAccess()
                          .then(storage => { callback(); })
                          .catch(err => { callback(); });
                    } else if (permission.state === 'denied') {
                      callback();
                    }
                  } else {
                    callback();
                  }
                })
                .catch(err => callback);
          }
        })
        .catch(err => { callback(); });
  } else {
    callback();
  }
}

export async function getStorageHandle() {
  // Check if Storage Access API is supported
  if (!document.requestStorageAccess) {
    // Storage Access API is not supported so best we can do is
    // hope it's an older browser that doesn't block 3P cookies.
    console.log('API not supported');
    return window;
  }

  // Check if access has already been granted
  if (await document.hasStorageAccess()) {
    console.log('access has already been granted');
    const handle = await document.requestStorageAccess({all: true});
    return handle || window;
  }

  // Check the storage-access permission
  // Wrap this in a try/catch for browsers that support the
  // Storage Access API but not this permission check
  // (e.g. Safari and older versions of Firefox).
  let permission;
  try {
    permission = await navigator.permissions.query(
      {name: 'storage-access'}
    );
  } catch (error) {
    // storage-access permission not supported. Assume no cookie access.
    console.log('storage-access permission not supported');
    return window;
  }

    if (permission) {
    if (permission.state === 'granted') {
      // Permission has previously been granted so can just call
      // requestStorageAccess() without a user interaction and
      // it will resolve automatically.
      console.log('storage-access permission is granted');
      try {
        const handle = await document.requestStorageAccess({all: true});
        return handle || window;
      } catch (error) {
        // This shouldn't really fail if access is granted, but return false
        // if it does.
        console.log(`error calling requestStorageAccess: ${error}`);
        return window;
      }
    } else if (permission.state === 'prompt') {
      // Need to call requestStorageAccess() after a user interaction
      // (potentially with a prompt). Can't do anything further here,
      // so handle this in the click handler.
      console.log('storage-access permission is prompt');
      return window;
    } else if (permission.state === 'denied') {
      // Currently not used. See:
      // https://github.com/privacycg/storage-access/issues/149
      console.log('storage-access permission is denied');
      return window;
    }
  }
  // By default return false, though should really be caught by one of above.
  return window;
}

export async function hasSAPerm() {
  // Check if Storage Access API is supported
  if (!document.hasStorageAccess) {
    // Storage Access API is not supported so best we can do is
    // hope it's an older browser that doesn't block 3P cookies.
    return true;
  }
  // Check if access has already been granted
  if (await document.hasStorageAccess()) {
    return true;
  }
  // Check the storage-access permission
  // Wrap this in a try/catch for browsers that support the
  // Storage Access API but not this permission check
  // (e.g. Safari and older versions of Firefox).
  let permission;
  try {
    permission = await navigator.permissions.query(
      {name: 'storage-access'}
    );
  } catch (error) {
    // storage-access permission not supported. Assume no cookie access.
    return false;
  }

    if (permission) {
    if (permission.state === 'granted') {
      // Permission has previously been granted so can just call
      // requestStorageAccess() without a user interaction and
      // it will resolve automatically.
        return true;
    } else if (permission.state === 'prompt') {
      // Need to call requestStorageAccess() after a user interaction
      // (potentially with a prompt). Can't do anything further here,
      // so handle this in the click handler.
      return false;
    } else if (permission.state === 'denied') {
      // Currently not used. See:
      // https://github.com/privacycg/storage-access/issues/149
      return false;
    }
  }
  // By default return false, though should really be caught by one of above.
  return false;
}
