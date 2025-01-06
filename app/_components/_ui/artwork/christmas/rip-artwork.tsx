import Image from 'next/image';

import type { IArtworkDetail } from '@/app/_types/artwork';
import type { IRipPartSet } from '@/app/_utils/rip-parts';
import { getRipParts } from '@/app/_utils/rip-parts';

interface IRipArtworkProps {
  artwork: IArtworkDetail;
  className?: string;
  height?: number;
  width?: number;
}

const RIP_PART_SET: IRipPartSet[] = [
  {
    index: 0,
    horizontal: {
      index: 1,
      imageUrl: 'vertical-rip-top-right.png',
      offset: {
        left: 'left-[50%]',
        top: 'top-0',
      },
      size: {
        height: 'h-[350px]',
        width: 'w-[40px]',
      },
    },
    vertical: {
      index: 2,
      imageUrl: 'horizontal-rip-bottom-left.png',
      offset: {
        top: 'bottom-[50%] translate-y-[43px]',
        left: 'left-0',
      },
      size: {
        height: 'h-[43px]',
        width: 'w-[350px]',
      },
    },
  },
  {
    index: 1,
    horizontal: {
      index: 0,
      imageUrl: 'vertical-rip-top-left.png',
      offset: {
        top: 'top-[50%] translate-y-1/2',
        right: 'left-0',
      },
      size: {
        width: 'w-[40px]',
        height: 'h-[350px]',
      },
    },
    vertical: {
      index: 3,
      imageUrl: 'horizontal-rip-bottom-right.png',
      offset: {
        top: 'bottom-[50%] translate-y-1/2',
        right: 'right-0',
      },
      size: {
        height: 'h-[43px]',
        width: 'w-[350px]',
      },
    },
  },
  {
    index: 3,
    horizontal: {
      index: 2,
      imageUrl: 'vertical-rip-bottom-left.png',
      offset: {
        bottom: 'bottom-[50%] translate-y-1/2',
        left: 'left-0',
      },
      size: {
        width: 'w-[40px]',
        height: 'h-[350px]',
      },
    },
    vertical: {
      index: 1,
      imageUrl: 'horizontal-rip-top-right.png',
      offset: {
        bottom: 'bottom-[50%] translate-y-1/2',
        right: 'right-0',
      },
      size: {
        width: 'w-[350px]',
        height: 'h-[43px]',
      },
    },
  },
  {
    index: 2,
    horizontal: {
      index: 3,
      imageUrl: 'vertical-rip-bottom-right.png',
      offset: {
        bottom: 'bottom-0',
        left: 'left-[50%]',
      },
      size: {
        width: 'w-[40px]',
        height: 'h-[350px]',
      },
    },
    vertical: {
      index: 0,
      imageUrl: 'horizontal-rip-top-left.png',
      offset: {
        bottom: 'bottom-[50%] translate-y-1/2',
        left: 'left-0',
      },
      size: {
        width: 'w-[350px]',
        height: 'h-[43px]',
      },
    },
  },
];

export default function RipArtwork({ artwork, className, height = 350, width = 61 }: IRipArtworkProps) {
  const ripParts = getRipParts(RIP_PART_SET, artwork);
  return (
    <div className={className}>
      {ripParts.map((rip) => {
        if (!rip.horizontal && !rip.vertical) return null;

        return (
          <div key={rip.index} className="w-full h-full absolute">
            {!!rip.horizontal && (
              <Image
                src={`/assets/components/ui/artwork/${rip.horizontal.imageUrl}`}
                alt="rip"
                width={width}
                height={height}
                className={`absolute z-10 ${rip.horizontal.size.width} ${rip.horizontal.size.height} ${rip.horizontal.offset.left || rip.horizontal.offset.right} ${rip.horizontal.offset.top || rip.horizontal.offset.bottom}`}
              />
            )}
            {!!rip.vertical && (
              <Image
                src={`/assets/components/ui/artwork/${rip.vertical.imageUrl}`}
                alt="rip"
                width={height}
                height={width}
                className={`absolute z-10 ${rip.vertical.size.width} ${rip.vertical.size.height} ${rip.vertical.offset.left || rip.vertical.offset.right} ${rip.vertical.offset.top || rip.vertical.offset.bottom}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
