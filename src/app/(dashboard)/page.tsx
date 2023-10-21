import { Clock } from '@/app/_components/Clock';
import { LineGraph } from '@/app/_components/LineGraph';

const Home = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 p-4">
      <div>
        <Clock />
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-x-8">
        <LineGraph />
      </div>
    </div>
  );
};
export default Home;
