'use client';
import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';

type ClockProps = {
  currentTime: Date;
};
export const Clock: React.FC<ClockProps> = ({ currentTime }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 text-center">
      <div>
        <AnalogClock dateTime={currentTime} />
      </div>
      <div className="flex items-center lg:block">
        <DigitalClock dateTime={currentTime} />
      </div>
    </div>
  );
};
