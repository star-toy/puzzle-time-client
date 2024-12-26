import Image from 'next/image';

import type { IArtworkDetail } from '@/app/_types/artwork';

type RipArtworkVariant = 'list' | 'detail';

interface IRipArtworkProps {
  artwork: IArtworkDetail;
  className?: string;
  height?: number;
  variant: RipArtworkVariant;
  width?: number;
}

export default function RipArtwork({ artwork, className, height = 350, variant = 'list', width = 61 }: IRipArtworkProps) {
  const ripParts = getRipParts(artwork, variant);
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

interface IRipPart {
  imageUrl: string;
  index: number;
  offset: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
  };
  size: {
    height: string;
    width: string;
  };
}

interface IRipPartSet {
  horizontal: IRipPart;
  index: number;
  vertical: IRipPart;
}

const RIP_PART_SET: Record<RipArtworkVariant, IRipPartSet[]> = {
  detail: [
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
          height: 'h-[225px]',
          width: 'w-[43px]',
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
          width: 'w-[255px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[225px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[225px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[240px]',
          height: 'h-[43px]',
        },
      },
    },
  ],
  list: [
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
          height: 'h-[225px]',
          width: 'w-[43px]',
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
          width: 'w-[255px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[225px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[225px]',
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
          width: 'w-[43px]',
          height: 'h-[225px]',
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
          width: 'w-[225px]',
          height: 'h-[43px]',
        },
      },
    },
  ],
};

interface IRipPartResult {
  horizontal: null | IRipPart;
  index: number;
  vertical: null | IRipPart;
}

function getRipParts(artwork: IArtworkDetail, variant: RipArtworkVariant) {
  return RIP_PART_SET[variant].reduce((acc, curr) => {
    if (!artwork.puzzles[curr.index]) return acc;
    const current = artwork.puzzles[curr.index];
    const horizontal = artwork.puzzles[curr.horizontal.index];
    const vertical = artwork.puzzles[curr.vertical.index];

    // 퍼즐 피스 간 비교해서 다른 경우에만 rip이 표시되므로 XOR 연산을 한다.
    // eslint-disable-next-line no-bitwise
    const needHorizontalRip = +current.isCompleted ^ +horizontal.isCompleted;
    // eslint-disable-next-line no-bitwise
    const needVerticalRip = +current.isCompleted ^ +vertical.isCompleted;

    const ripPart: IRipPartResult = {
      index: curr.index,
      horizontal: needHorizontalRip && current.isCompleted ? curr.horizontal : null,
      vertical: needVerticalRip && current.isCompleted ? curr.vertical : null,
    };

    acc.push(ripPart);

    return acc;
  }, [] as IRipPartResult[]);
}
