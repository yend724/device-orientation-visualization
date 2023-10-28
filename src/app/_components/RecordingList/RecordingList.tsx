import { Link } from '@/app/_components/Link';
import { Button } from '@/app/_components/Button';

type RangeStore = {
  start: number;
  end: number;
}[];
export type RecordingListProps = {
  recodingList: RangeStore;
  onSelect: (key: number) => void;
  onDelete: (key: number) => void;
};
export const RecordingList: React.FC<RecordingListProps> = ({
  recodingList,
  onSelect,
  onDelete,
}) => {
  const handleSelect = (key: number) => {
    onSelect(key);
  };
  const handleDelete = (key: number) => {
    onDelete(key);
  };

  return (
    <div>
      {recodingList.length === 0 && <p>録画はありません</p>}
      <ul className="grid list-disc gap-y-4 pl-4 empty:hidden">
        {recodingList.map((record) => {
          const { start, end } = record;
          return (
            <li key={record.start}>
              <div className="flex items-center gap-x-4">
                <Link href="#" onClick={() => handleSelect(start)}>
                  {new Date(start).toLocaleString()} ~ {new Date(end).toLocaleString()}の録画
                </Link>
                <Button size="small" variant="secondary" onClick={() => handleDelete(start)}>
                  削除
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
