'use client';
import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';
import { useClock } from '@/app/_hooks/useClock';

export const Clock = () => {
  const { currentTime } = useClock();

  return (
    <div>
      <AnalogClock dateTime={currentTime} />
      <div className="mt-4 text-center">
        <DigitalClock dateTime={currentTime} />
      </div>
    </div>
  );
};
