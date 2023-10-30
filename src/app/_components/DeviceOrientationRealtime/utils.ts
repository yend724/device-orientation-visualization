type OrientationData = {
  alpha: number;
  gamma: number;
  beta: number;
  timestamp: number;
};
export const filterArrayByTimestamp = (
  data: OrientationData[],
  currentTimestamp: number,
  seconds: number,
) => {
  return data.filter((d) => {
    const diff = currentTimestamp - d.timestamp;
    return diff <= seconds * 1000;
  });
};
