'use client';

import cx from 'clsx';

import { cn } from '@/app/_utils/classNames';

interface IBasePopupProps {
  children: React.ReactNode;
  className?: string;
  height?: 'auto' | 'full' | `${number}px` | `${number}%`;
  onClose?: () => void;
  width?: 'auto' | 'full' | `${number}px` | `${number}%`;
}

export function Wrapper({ children, width = 'auto', height = 'auto', className, onClose }: IBasePopupProps) {
  return (
    <div className={className || 'w-full h-full absolute top-0 left-0 z-[100] flex flex-col items-center justify-center'}>
      <div className="w-full h-full relative bg-black bg-opacity-50" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose?.()} />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center">
        <div
          className={cx(
            `bg-[#F3E5CE] flex flex-col items-center justify-center`,
            {
              width: width === 'auto' ? 'w-auto' : width === 'full' ? 'w-full' : width,
              height: height === 'auto' ? 'h-auto' : height === 'full' ? 'h-full' : height,
            },
            className,
          )}
          style={{
            width: width !== 'auto' && width !== 'full' ? width : undefined,
            height: height !== 'auto' && height !== 'full' ? height : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  onClick: () => void;
}

export function Button({ onClick, label, className, children }: IButtonProps) {
  return (
    <button
      type="button"
      className={cn('bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] w-[150px] h-[40px] rounded-[5px] text-[20px]', className)}
      onClick={onClick}
    >
      {label || children}
    </button>
  );
}
