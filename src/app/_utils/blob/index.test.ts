import { convertArrayToBlob, readBlob } from './index';

describe('convertArrayToBlob', () => {
  test('配列からBlobへ', () => {
    const array = [1, 2, 3];
    const blob = convertArrayToBlob(array);
    expect(blob).toBeInstanceOf(Blob);
    const reader = new FileReader();
    reader.readAsText(blob);
    reader.onload = () => {
      const result = reader.result;
      expect(result).toEqual(JSON.stringify(array));
    };
  });
});

describe('readBlob', () => {
  test('Blobを正しく読み込めるか', async () => {
    const array = [1, 2, 3];
    const blob = convertArrayToBlob(array);
    const parsedArray = await readBlob<number[]>(blob);
    expect(parsedArray).toEqual(array);
  });

  test('失敗した時にエラーがでるか', () => {
    const invalidBlob = new Blob(['invalid json'], { type: 'application/json' });
    expect(readBlob(invalidBlob)).rejects.toEqual('Blobの読み込みに失敗しました');
  });
});
