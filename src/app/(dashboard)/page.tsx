'use client';
import { Clock } from '@/app/_components/Clock';
import { DeviceOrientation } from '@/app/_components/DeviceOrientation';
import { useClock } from '@/app/_hooks/useClock';

const Home = () => {
  const { currentTime } = useClock();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
      <div className="text-left">
        <Clock currentTime={currentTime} />
      </div>
      <div>
        <DeviceOrientation />
      </div>
    </div>
  );
};
export default Home;
