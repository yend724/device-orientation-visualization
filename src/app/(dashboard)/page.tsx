'use client';
import { Clock } from '@/app/_components/Clock';
import { DeviceOrientationRealtime } from '@/app/_components/DeviceOrientationRealtime';
import { useClock } from '@/app/_hooks/useClock';
import { BreadCrumbs } from '@/app/_components/Breadcrumbs';

const Home = () => {
  const { currentTime } = useClock();

  return (
    <div className="grid gap-y-12">
      <BreadCrumbs paths={[{ label: 'ホーム', href: '/' }]} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <div>
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
