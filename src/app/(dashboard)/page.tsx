'use client';
import { Clock } from '@/app/_components/Clock';
import { DeviceOrientationRealtime } from '@/app/_components/DeviceOrientationRealtime';
import { useClock } from '@/app/_hooks/useClock';

const Home = () => {
  const { currentTime } = useClock();

  return (
    <div className="grid gap-y-12">
      <div>
        <p>ホーム</p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <div className="text-left">
          <Clock currentTime={currentTime} />
        </div>
        <div>
          <DeviceOrientationRealtime />
        </div>
      </div>
    </div>
  );
};
export default Home;
