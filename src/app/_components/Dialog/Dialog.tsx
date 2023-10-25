import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type DialogProps = HTMLAttributes<HTMLDialogElement>;
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const { children, className, ...others } = props;
  return (
    <dialog
      {...others}
      ref={ref}
      className={twMerge(
        'bg-neutral-900 border-solid border border-neutral-700 text-neutral-100',
        className,
      )}
    >
      {children}
    </dialog>
  );
});
Dialog.displayName = 'Dialog';
