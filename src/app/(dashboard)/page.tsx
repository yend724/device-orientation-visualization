import { Clock } from '@/app/_components/Clock';
import { DeviceOrientation } from '@/app/_components/DeviceOrientation';
import { Card, CardContent } from '@/app/_components/Card';

const Home = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8">
      <div>
        <Card>
          <CardContent>
            <Clock />
          </CardContent>
        </Card>
      </div>
      <div>
        <DeviceOrientation />
      </div>
    </div>
  );
};
export default Home;
