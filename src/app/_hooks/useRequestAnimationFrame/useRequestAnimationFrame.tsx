import { useEffect, useCallback, useRef } from 'react';

export const useRequestAnimationFrame = (
  callback: (time: number) => void,
  isRunning: boolean = true,
) => {
  const reqId = useRef<number | null>(null);
  const loop = useCallback(
    (time: number) => {
      if (isRunning) {
        callback(time);
        reqId.current = requestAnimationFrame(loop);
      }
    },
    [isRunning, callback],
  );

  useEffect(() => {
    reqId.current = requestAnimationFrame(loop);
    return () => {
      if (reqId.current) {
        cancelAnimationFrame(reqId.current);
      }
    };
  }, [loop]);
};
