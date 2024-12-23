import Link from 'next/link';

import { cn } from '@/app/_utils/classNames';

interface ILinkButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function LinkButton({ href, children, className }: ILinkButtonProps) {
  return (
    <Link href={href} className={cn('bg-popup-secondary border-2 border-popup-primary rounded text-white py-1.5 px-7', className)}>
      {children}
    </Link>
  );
}
