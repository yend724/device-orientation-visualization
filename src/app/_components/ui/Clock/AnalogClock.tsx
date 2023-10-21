import { CSSProperties } from 'react';
import { splitDateTime } from './utils';

export type AnalogClockProps = {
  dateTime: Date;
};
export const AnalogClock: React.FC<AnalogClockProps> = ({ dateTime }) => {
  const { hours, minutes, seconds } = splitDateTime(dateTime);
  return (
    <div className="relative h-[200px] w-[200px] rounded-full bg-gray-700">
      <div
        style={{ '--rotate-deg': `${(hours + minutes / 60) * 30 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 h-[6px] w-[30%] origin-[center_left] rotate-[var(--rotate-deg)] bg-white"
      ></div>
      <div
        style={{ '--rotate-deg': `${minutes * 6 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 h-[4px] w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-white"
      ></div>
      <div
        style={{ '--rotate-deg': `${seconds * 6 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 h-[4px] w-[40%]  origin-[center_left] rotate-[var(--rotate-deg)] bg-orange-300"
      ></div>
    </div>
  );
};
