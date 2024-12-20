import cx from 'clsx';

interface IBasePopupProps {
  children: React.ReactNode;
  className?: string;
  height?: 'auto' | 'full' | `${number}px` | `${number}%`;
  width?: 'auto' | 'full' | `${number}px` | `${number}%`;
}

export function Wrapper({ children, width = 'auto', height = 'auto', className }: IBasePopupProps) {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-[100] flex flex-col items-center justify-center">
      <div className="w-full h-full relative bg-black bg-opacity-50" />
      <div className="w-full h-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center">
        <div
          className={cx(
            `bg-[#F3E5CE] z-10 top-0 left-0 flex flex-col items-center justify-center`,
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
