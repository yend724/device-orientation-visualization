import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecordingList, RecordingListProps } from './RecordingList';

describe('RecordingListコンポーネント', () => {
  const setup = (props: RecordingListProps) => {
    render(<RecordingList {...props} />);
  };

  test('録画リストが空の場合、空のメッセージが表示される', () => {
    const onDelete = jest.fn();
    setup({ recodingList: [], onDelete });
    expect(screen.getByText('録画はありません')).toBeInTheDocument();
  });

  test('録画リストが存在する場合、リストが表示される', () => {
    const onDelete = jest.fn();
    const recodingList = [{ start: 1, end: 2 }];
    setup({ recodingList, onDelete });
    expect(screen.getByText(/の録画/)).toBeInTheDocument();
  });

  test('削除ボタンをクリックすると、削除が呼び出される', async () => {
    const onDelete = jest.fn();
    const recodingList = [{ start: 1, end: 2 }];
    setup({ recodingList, onDelete });
    await userEvent.click(screen.getByText('削除'));
    expect(onDelete).toHaveBeenCalled();
  });
});
