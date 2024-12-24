import Image from 'next/image';

import type { IArtwork, IArtworkDetail } from '@/app/_types/artwork';
import { IPuzzle } from '@/app/_types/puzzle';

export default function ArtworkPuzzles({ artwork, width, height }: { artwork: IArtworkDetail; height: number; width: number }) {
  const pieceWidth = width / 2;
  const pieceHeight = height / 2;

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full grid grid-cols-2">
        {artwork.puzzles.map((puzzle, index) => (
          <div key={puzzle.puzzleUid} className="w-fit relative">
            <Image
              key={puzzle.puzzleUid}
              src={puzzle.imageUrl}
              alt={puzzle.puzzleUid}
              width={pieceWidth}
              height={pieceHeight}
              className="shadow-[10px_10px_10px_0px_rgba(0,0,0,0.251)]"
            />
            {!puzzle.isCompleted && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />}
          </div>
        ))}
      </div>
      <RipParts artwork={artwork} className="absolute z-50 top-0 left-0 w-full h-full border-2 " />
    </div>
  );
}

function RipParts({ artwork, className }: { artwork: IArtworkDetail; className?: string }) {
  const ripParts = getRipParts(artwork);
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
                width={350}
                height={61}
                className={`absolute z-10 ${rip.horizontal.size.width} ${rip.horizontal.size.height} ${rip.horizontal.offset.left || rip.horizontal.offset.right} ${rip.horizontal.offset.top || rip.horizontal.offset.bottom}`}
              />
            )}
            {!!rip.vertical && (
              <Image
                src={`/assets/components/ui/artwork/${rip.vertical.imageUrl}`}
                alt="rip"
                width={61}
                height={350}
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
];

interface IRipPartResult {
  horizontal: null | IRipPart;
  index: number;
  vertical: null | IRipPart;
}

function getRipParts(artwork: IArtworkDetail) {
  return RIP_PART_SET.reduce((acc, curr) => {
    if (!artwork.puzzles[curr.index]) return acc;
    const current = artwork.puzzles[curr.index];
    const horizontal = artwork.puzzles[curr.horizontal.index];
    const vertical = artwork.puzzles[curr.vertical.index];

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
