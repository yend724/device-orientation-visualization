import { useEffect, useState } from 'react';

export const useClock = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date('2000-01-01 00:00:00.000'));

  useEffect(() => {
    setDateTime(new Date());
    let timerId: number;
    const loop = () => {
      setDateTime(new Date());
      timerId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      if (timerId) {
        cancelAnimationFrame(timerId);
      }
    };
  }, []);

  return { currentTime: dateTime };
};
