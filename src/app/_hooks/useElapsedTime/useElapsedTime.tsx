import { useEffect, useState, useCallback, useRef } from 'react';

export const useElapsedTime = () => {
  const lastTimestamp = useRef<number | null>(null);
  const reqId = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);
  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);
  const update = useCallback((time: number) => {
    setElapsedTime(time);
  }, []);
  const reset = useCallback(() => {
    setElapsedTime(0);
  }, []);

  const loop = useCallback(() => {
    if (isRunning) {
      const now = Date.now();
      reqId.current = requestAnimationFrame(loop);
      if (lastTimestamp.current === null) {
        lastTimestamp.current = now;
        return;
      }
      const diff = now - lastTimestamp.current;
      setElapsedTime((prev) => prev + diff);
      lastTimestamp.current = now;
    } else {
      lastTimestamp.current = null;
    }
  }, [isRunning]);

  useEffect(() => {
    reqId.current = requestAnimationFrame(loop);
    return () => {
      if (reqId.current) {
        cancelAnimationFrame(reqId.current);
      }
    };
  }, [loop]);

  return { start, stop, reset, update, isRunning, elapsedTime };
};
