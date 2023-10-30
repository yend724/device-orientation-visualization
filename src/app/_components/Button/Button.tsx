import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  disabled?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, variant, size, className, disabled, ...others } = props;
  const isSecondary = variant === 'secondary';
  const isSmall = size === 'small';

  return (
    <button
      {...others}
      ref={ref}
      disabled={disabled}
      className={twMerge(
        'flex items-center justify-between gap-x-2 whitespace-nowrap rounded-md bg-neutral-50 px-4 py-2 text-neutral-900 hover:opacity-70 focus:border-neutral-50',
        isSecondary && 'bg-neutral-900 border border-neutral-50 text-neutral-50 hover:opacity-70',
        isSmall && 'text-sm px-2 py-1 rounded',
        disabled && 'pointer-events-none opacity-20 hover:opacity-20',
        className,
      )}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';
