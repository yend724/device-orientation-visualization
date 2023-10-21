import { Clock } from '@/app/_components/Clock';

const Home = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 p-4">
      <div>
        <Clock />
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-x-8">
        <div>折れ線グラフ</div>
        <div>値</div>
      </div>
    </div>
  );
};
export default Home;
