'use client';
import { Button } from '@/app/_components/Button';
import { Dialog, useDialog } from '@/app/_components/Dialog';

export const Record = () => {
  const { ref, open, close } = useDialog();
  return (
    <>
      <Button onClick={open}>
        <span>録画</span>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-4" role="img">
          <circle cx="100" cy="100" r="100" fill="red" />
        </svg>
      </Button>
      <Dialog ref={ref}>
        <h2 className="px-6 py-4 text-lg">録画を開始しますか？</h2>
        <div className="flex gap-4 px-6 py-4 text-end">
          <Button onClick={close} size="small">
            録画する
          </Button>
          <Button onClick={close} autoFocus variant="secondary" size="small">
            キャンセル
          </Button>
        </div>
      </Dialog>
    </>
  );
};
