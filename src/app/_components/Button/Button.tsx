import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const defaultStyle =
  'flex items-center justify-between gap-x-2 whitespace-nowrap rounded-md bg-neutral-50 px-4 py-2 text-neutral-900 hover:bg-neutral-200 focus:border-neutral-50';
const secondaryStyle =
  'bg-neutral-900 border border-neutral-50 text-neutral-50 hover:bg-neutral-800';
const smallStyle = 'text-sm px-2 py-1 rounded';
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, variant, size, className, ...others } = props;
  const isSecondary = variant === 'secondary';
  const isSmall = size === 'small';

  return (
    <button
      {...others}
      ref={ref}
      className={twMerge(
        defaultStyle,
        className,
        isSecondary && secondaryStyle,
        isSmall && smallStyle,
      )}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';
