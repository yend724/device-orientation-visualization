'use clinet';
import { Button } from '@/app/_components/Button';
import { Dialog, useDialog } from '@/app/_components/Dialog';
import { getText } from './utils';

export type RecordProps = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};
export const Record: React.FC<RecordProps> = ({ isRecording, onStart, onStop }) => {
  const { ref, open, close } = useDialog();
  const handleAction = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
    close();
  };

  const text = getText(isRecording);

  return (
    <>
      <Button onClick={open}>
        <span>{text.trigger}する</span>
      </Button>
      <Dialog ref={ref}>
        <h2 className="px-6 py-4 text-lg">{text.title}を開始しますか？</h2>
        <div className="flex gap-4 px-6 py-4 text-end">
          <Button onClick={handleAction} size="small">
            {text.action}する
          </Button>
          <Button onClick={close} autoFocus variant="secondary" size="small">
            キャンセル
          </Button>
        </div>
      </Dialog>
    </>
  );
};
