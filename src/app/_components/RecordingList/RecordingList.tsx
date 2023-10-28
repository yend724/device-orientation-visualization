import { Link } from '@/app/_components/Link';

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
      <ul className="grid list-disc gap-y-4 pl-4">
        {recodingList.length === 0 && <li>録画はありません</li>}
        {recodingList.map((record) => {
          const { start, end } = record;
          return (
            <li key={record.start} className="flex gap-x-4">
              <Link href="#" onClick={() => handleSelect(start)}>
                {new Date(start).toLocaleString()} ~ {new Date(end).toLocaleString()}の録画
              </Link>
              <button onClick={() => handleDelete(start)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
