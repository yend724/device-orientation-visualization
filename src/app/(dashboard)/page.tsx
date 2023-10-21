import { Clock } from '@/app/_components/Clock';
import { LineGraph } from '@/app/_components/LineGraph';
import { Card } from '@/app/_components/Card';

const Home = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 p-4">
      <div>
        <Card>
          <Clock />
        </Card>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-x-8">
        <Card>
          <LineGraph />
        </Card>
      </div>
    </div>
  );
};
export default Home;
