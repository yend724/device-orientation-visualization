export const convertArrayToBlob = (array: unknown[]) => {
  return new Blob([JSON.stringify(array)], { type: 'application/json' });
};
export const readBlob = <T>(blob: Blob): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(blob);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(JSON.parse(result));
      } else {
        reject('Blobの読み込みに失敗しました');
      }
    };
  });
};
