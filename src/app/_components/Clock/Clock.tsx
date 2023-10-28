'use client';
import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';

type ClockProps = {
  currentTime: Date;
};
export const Clock: React.FC<ClockProps> = ({ currentTime }) => {
  return (
    <div>
      <AnalogClock dateTime={currentTime} />
      <div className="mt-4 text-center">
        <DigitalClock dateTime={currentTime} />
      </div>
    </div>
  );
};
