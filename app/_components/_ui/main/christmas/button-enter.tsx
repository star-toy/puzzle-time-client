import Image from 'next/image';
import Link from 'next/link';

interface IButtonEnterProps {
  className?: string;
}

export default function ButtonEnter({ className }: IButtonEnterProps) {
  return (
    <Link href="/main/christmas/puzzle/artwork-uid" className={className}>
      <Image src="/assets/mainpage/christmas/button-enter.png" alt="게임 입장" width={500} height={90} />
    </Link>
  );
}
