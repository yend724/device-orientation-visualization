import {
  opneIndexedDB,
  createObjectStores,
  readIndexedDBAll,
  readIndexedDBAllKeys,
  readIndexedDBValue,
  wirteIndexedDBValue,
  deleteIndexedDBValue,
} from './index';
import 'fake-indexeddb/auto';

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});
describe('IndexedDB', () => {
  const dbName = 'testDB';
  const storeName = 'testStore';
  const version = 1;

  beforeEach(() => {
    createObjectStores(dbName, storeName, version);
  });

  test('opneIndexedDBが想定した挙動となる', async () => {
    const request = await opneIndexedDB({ dbName, version });
    expect(request.result.name).toBe(dbName);
  });

  test('createObjectStoresが想定した挙動となる', async () => {
    const request = await opneIndexedDB({ dbName, version });
    expect(request.result.objectStoreNames.contains(storeName)).toBeTruthy();
  });

  test('readIndexedDBAllが想定した挙動となる', async () => {
    const request = await readIndexedDBAll(dbName, storeName);
    expect(request.result).toEqual([]);
  });

  test('readIndexedDBAllKeysが想定した挙動となる', async () => {
    const request = await readIndexedDBAllKeys(dbName, storeName);
    expect(request.result).toEqual([]);
  });

  test('readIndexedDBValueが想定した挙動となる', async () => {
    const key = 'testKey';
    const value = 'testValue';
    await wirteIndexedDBValue({ dbName, data: { key, value }, storeName });
    const request = await readIndexedDBValue(dbName, storeName, key);
    expect(request.result).toBe(value);
  });

  test('wirteIndexedDBValueが想定した挙動となる', async () => {
    const key = 'testKey2';
    const value = 'testValue2';
    const request = await wirteIndexedDBValue({ dbName, data: { key, value }, storeName });
    expect(request).toBeInstanceOf(IDBRequest);
    const request2 = await readIndexedDBAll(dbName, storeName);
    expect(request2.result).toEqual(['testValue', 'testValue2']);
  });

  test('deleteIndexedDBValueが想定した挙動となる', async () => {
    const key1 = 'testKey';
    const key2 = 'testKey1';
    await deleteIndexedDBValue(dbName, storeName, key1);
    const request = await deleteIndexedDBValue(dbName, storeName, key2);
    expect(request.result).toBeUndefined();
  });
});
