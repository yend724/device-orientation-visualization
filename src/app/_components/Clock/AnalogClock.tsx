import { CSSProperties } from 'react';
import { splitDateTime } from './utils';

export type AnalogClockProps = {
  dateTime: Date;
};
export const AnalogClock: React.FC<AnalogClockProps> = ({ dateTime }) => {
  const { hours, minutes, seconds } = splitDateTime(dateTime);

  return (
    <div className="relative aspect-[1/1] w-[12rem] rounded-full bg-neutral-800 sm:w-[15rem]">
      <div
        style={{ '--rotate-deg': `${(hours + minutes / 60) * 30 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 z-10 h-[6px] w-[30%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"
      ></div>
      <div
        style={{ '--rotate-deg': `${minutes * 6 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 z-10 h-[4px] w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"
      ></div>
      <div
        style={{ '--rotate-deg': `${seconds * 6 - 90}deg` } as CSSProperties}
        className="absolute left-1/2 top-1/2 z-10 h-[4px]  w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-orange-500"
      ></div>
      <ol className="relative h-full w-full text-center [&>li]:-translate-x-1/2 [&>li]:-translate-y-1/2">
        <li className="absolute left-[70%] top-[14%]">1</li>
        <li className="absolute left-[86%] top-[28%]">2</li>
        <li className="absolute left-[90%] top-[50%]">3</li>
        <li className="absolute left-[86%] top-[72%]">4</li>
        <li className="absolute left-[70%] top-[86%]">5</li>
        <li className="absolute left-[50%] top-[90%]">6</li>
        <li className="absolute left-[30%] top-[86%]">7</li>
        <li className="absolute left-[14%] top-[72%]">8</li>
        <li className="absolute left-[10%] top-[50%]">9</li>
        <li className="absolute left-[14%] top-[28%]">10</li>
        <li className="absolute left-[30%] top-[14%]">11</li>
        <li className="absolute left-[50%] top-[10%]">12</li>
      </ol>
    </div>
  );
};
