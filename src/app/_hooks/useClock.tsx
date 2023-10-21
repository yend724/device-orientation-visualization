import { useEffect, useState } from 'react';

export const useClock = ({
  initial = new Date('2000-01-01 00:00:00'),
}: { initial?: Date } = {}) => {
  const [dateTime, setDateTime] = useState<Date>(initial);

  useEffect(() => {
    setDateTime(new Date());
    let timerId: number | null = null;
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
