export const opneIndexedDB = (
  dbName: string,
  version = 1,
  onUpgradeneeded?: (request: IDBOpenDBRequest) => void,
): Promise<IDBOpenDBRequest> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.addEventListener('upgradeneeded', () => {
      onUpgradeneeded?.(request);
    });

    request.addEventListener('success', () => {
      resolve(request);
    });

    request.addEventListener('error', (e) => {
      console.error('データベースを開けませんでした');
      reject(e);
    });
  });
};

export const saveOrientationData = async (start: number, end: number, data: Blob) => {
  const request = await opneIndexedDB('DeviceOrientationVisualizationDB', 1, (request) => {
    const db = request.result;
    db.createObjectStore('recordStore', { autoIncrement: true });
    db.createObjectStore('rangeStore', { autoIncrement: true });
  });

  const db = request.result;
  const objectStoreNames = db.objectStoreNames;

  if (objectStoreNames.contains('recordStore')) {
    const transaction = db.transaction('recordStore', 'readwrite');
    const store = transaction.objectStore('recordStore');
    store.add(data, start.toString());

    transaction.addEventListener('complete', () => {
      console.log('データを追加しました');
    });
  } else {
    console.error('オブジェクトストアが存在しません');
  }

  if (objectStoreNames.contains('rangeStore')) {
    const transaction = db.transaction('rangeStore', 'readwrite');
    const store = transaction.objectStore('rangeStore');
    store.add({ start, end }, start.toString());

    transaction.addEventListener('complete', () => {
      console.log('データを追加しました');
    });
  }
};

export const readIndexedDBAll = (
  dbName: string,
  storeName: string,
): Promise<IDBRequest<unknown[]>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB(dbName);
    const db = request.result;
    const objectStoreNames = db.objectStoreNames;
    if (objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.addEventListener('success', () => {
        resolve(request);
      });
    } else {
      reject('オブジェクトストアが存在しません');
    }
  });
};

export const readIndexedDBAllKeys = (
  dbName: string,
  storeName: string,
): Promise<IDBRequest<IDBValidKey[]>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB(dbName, 1);
    const db = request.result;
    const objectStoreNames = db.objectStoreNames;
    if (objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAllKeys();
      request.addEventListener('success', () => {
        resolve(request);
      });
    } else {
      reject('オブジェクトストアが存在しません');
    }
  });
};

export const readIndexedDBValue = <T>(
  dbName: string,
  storeName: string,
  key: string,
): Promise<IDBRequest<T>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB(dbName);
    const db = request.result;
    const objectStoreNames = db.objectStoreNames;
    if (objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.addEventListener('success', () => {
        resolve(request);
      });
    } else {
      reject('オブジェクトストアが存在しません');
    }
  });
};
export const deleteIndexedDBValue = (
  dbName: string,
  storeName: string,
  key: string,
): Promise<IDBRequest> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB(dbName);
    const db = request.result;
    const objectStoreNames = db.objectStoreNames;
    if (objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      request.addEventListener('success', () => {
        resolve(request);
      });
    } else {
      reject('オブジェクトストアが存在しません');
    }
  });
};
