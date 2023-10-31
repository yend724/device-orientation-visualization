import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
} from './index';

describe('SessionStorage', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.clear = jest.fn();
  });

  test('setSessionStorageが期待の関数をコールする', () => {
    setSessionStorage('testKey', 'testValue');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('testValue'));
  });

  test('getSessionStorageが期待の関数をコールする', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify('testValue'));
    const value = getSessionStorage('testKey');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(value).toBe('testValue');
  });

  test('removeSessionStorageが期待の関数をコールする', () => {
    removeSessionStorage('testKey');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('testKey');
  });

  test('clearSessionStorageが期待の関数をコールする', () => {
    clearSessionStorage();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
