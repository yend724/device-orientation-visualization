export const opneIndexedDB = ({
  dbName,
  version = 1,
  onSuccess,
  onUpgradeneeded,
  onError,
}: {
  dbName: string;
  version?: number;
  onSuccess?: (e: IDBOpenDBRequest) => void;
  onUpgradeneeded?: (e: IDBOpenDBRequest) => void;
  onError?: (e: Event) => void;
}): Promise<IDBOpenDBRequest> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.addEventListener('upgradeneeded', () => {
      onUpgradeneeded?.(request);
    });
    request.addEventListener('success', () => {
      onSuccess?.(request);
      resolve(request);
    });

    request.addEventListener('error', (e) => {
      console.error('データベースを開けませんでした');
      onError?.(e);
      reject(`[${dbName}]データベースを開けませんでした`);
    });
  });
};

export const createObjectStores = (dbName: string, stores: string | string[], version = 1) => {
  opneIndexedDB({
    dbName,
    version,
    onUpgradeneeded: (result) => {
      const db = result.result;
      if (typeof stores === 'string') {
        db.createObjectStore(stores, { autoIncrement: true });
      }
      if (Array.isArray(stores)) {
        stores.forEach((store) => {
          db.createObjectStore(store, { autoIncrement: true });
        });
      }
    },
  });
};

export const readIndexedDBAll = (
  dbName: string,
  storeName: string,
): Promise<IDBRequest<unknown[]>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB({ dbName });
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
      reject(`[${storeName}]オブジェクトストアが存在しません`);
    }
  });
};

export const readIndexedDBAllKeys = (
  dbName: string,
  storeName: string,
): Promise<IDBRequest<IDBValidKey[]>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB({ dbName });
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
      reject(`[${storeName}]オブジェクトストアが存在しません`);
    }
  });
};

export const readIndexedDBValue = <T>(
  dbName: string,
  storeName: string,
  key: string,
): Promise<IDBRequest<T>> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB({ dbName });
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
      reject(`[${storeName}]オブジェクトストアが存在しません`);
    }
  });
};
export const wirteIndexedDBValue = async ({
  dbName,
  data,
  version = 1,
  storeName,
}: {
  dbName: string;
  data: {
    key?: IDBValidKey;
    value: unknown;
  };
  version?: number;
  storeName: string;
}): Promise<IDBRequest> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB({
      dbName,
      version,
    });
    const db = request.result;
    const objectStoreNames = db.objectStoreNames;

    if (objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      store.add(data.value, data.key);

      transaction.addEventListener('complete', () => {
        console.log('データを追加しました');
        resolve(request);
      });
    } else {
      reject(`[${storeName}]オブジェクトストアが存在しません`);
    }
  });
};
export const deleteIndexedDBValue = (
  dbName: string,
  storeName: string,
  key: string,
): Promise<IDBRequest> => {
  return new Promise(async (resolve, reject) => {
    const request = await opneIndexedDB({ dbName });
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
      reject(`[${storeName}]オブジェクトストアが存在しません`);
    }
  });
};
