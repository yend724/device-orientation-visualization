import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Buttonコンポーネント', () => {
  test('クリックイベントが実行される', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>ボタン</Button>);
    const button = screen.getByRole('button', { name: 'ボタン' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
