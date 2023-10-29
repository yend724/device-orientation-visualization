import { createPath } from './index';

describe('utils/url', () => {
  test('URLを返す', () => {
    const path = '/test';
    const url = createPath(path);
    expect(url).toBeInstanceOf(URL);
  });

  test('URLに想定したパスを含む', () => {
    const path = '/test';
    const url = createPath(path);
    expect(url.pathname).toEqual(path);
  });

  test('URLに想定したパラメーターを含む', () => {
    const path = '/test';
    const params = { foo: 'bar', baz: 123 };
    const url = createPath(path, params);
    expect(url.searchParams.get('foo')).toEqual(params.foo);
    expect(url.searchParams.get('baz')).toEqual(params.baz.toString());
  });
});
