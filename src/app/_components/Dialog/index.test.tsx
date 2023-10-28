import { render, screen, renderHook } from '@testing-library/react';
import { Dialog } from './Dialog';
import { useDialog } from './hooks';

HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});

describe('Dialogコンポーネント', () => {
  test('open / close の確認', () => {
    const { result } = renderHook(() => useDialog());
    const { ref, open, close } = result.current;
    render(<Dialog ref={ref}>ボタン</Dialog>);
    const dialog = screen.getByRole<HTMLDialogElement>('dialog', { hidden: true });
    expect(dialog.open).toBe(false);

    open();
    expect(dialog.open).toBe(true);

    close();
    expect(dialog.open).toBe(false);
  });
});
