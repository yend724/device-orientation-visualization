import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Record } from './Record';

HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});

describe('Recordコンポーネント', () => {
  test('録画を開始するボタンがレンダリングされる', async () => {
    const onStart = jest.fn();
    const onStop = jest.fn();
    const props = { isRecording: false, onStart, onStop };
    render(<Record {...props} />);
    const button = screen.getByTestId('trigger');
    await userEvent.click(button);
    const button2 = screen.getByTestId('action');
    await userEvent.click(button2);
    expect(onStart).toHaveBeenCalled();
  });

  test('録画を停止するボタンがレンダリングされる', async () => {
    const onStart = jest.fn();
    const onStop = jest.fn();
    const props = { isRecording: true, onStart, onStop };
    render(<Record {...props} />);
    const button = screen.getByTestId('trigger');
    await userEvent.click(button);
    const button2 = screen.getByTestId('action');
    await userEvent.click(button2);
    expect(onStop).toHaveBeenCalled();
  });
});
