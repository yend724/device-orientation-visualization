import { formatDateTimeToDigital } from './utils';

type DigitalClockProps = {
  dateTime: Date;
};
export const DigitalClock: React.FC<DigitalClockProps> = ({ dateTime }) => {
  const { date, time } = formatDateTimeToDigital(dateTime);
  return (
    <span className="grid grid-rows-2 text-2xl">
      <span>{date}</span>
      <span>{time}</span>
    </span>
  );
};
