import { Clock } from '@/app/_components/Clock';
import { DeviceOrientation } from '@/app/_components/DeviceOrientation';

const Home = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8">
      <div>
        <Clock />
      </div>
      <div>
        <DeviceOrientation />
      </div>
    </div>
  );
};
export default Home;
