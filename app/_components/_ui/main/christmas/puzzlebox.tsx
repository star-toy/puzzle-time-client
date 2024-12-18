'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { Artwork, ArtworkPuzzle } from '@/app/_types/artwork';

interface PuzzleBoxProps {
  index: number;
  puzzle: ArtworkPuzzle;
}

const PUZZLE_FRAME_IMAGES = [
  {
    frame: {
      imageUrl: '/assets/mainpage/christmas/puzzle-0-frame.png',
      width: 400,
      height: 417,
      offset: {
        top: 0,
        left: 0,
      },
      zIndex: 0,
    },
    item: {
      width: 337,
      height: 337,
      zIndex: 1,
      offset: {
        bottom: 0,
      },
    },
  },
  {
    frame: {
      imageUrl: '/assets/mainpage/christmas/puzzle-1-frame.png',
      width: 400,
      height: 417,
      offset: {
        top: 0,
        right: 0,
      },
      zIndex: 0,
    },
    item: {
      width: 337,
      height: 337,
      zIndex: 1,
      offset: {
        bottom: 0,
      },
    },
  },
  {
    frame: {
      imageUrl: '/assets/mainpage/christmas/puzzle-2-frame.png',
      width: 400,
      height: 417,
      offset: {
        bottom: 0,
        left: 0,
      },
      zIndex: 0,
    },
    item: {
      width: 337,
      height: 337,
      zIndex: 1,
      offset: {
        bottom: 0,
      },
    },
  },
  {
    frame: {
      imageUrl: '/assets/mainpage/christmas/puzzle-3-frame.png',
      width: 400,
      height: 417,
      offset: {
        bottom: 0,
        right: 0,
      },
      zIndex: 0,
    },
    item: {
      imageUrl: '/assets/mainpage/christmas/puzzle-3-cover.png',
      width: 337,
      height: 337,
      zIndex: 1,
      offset: {
        bottom: 0,
      },
    },
  },
  {
    frame: {
      imageUrl: '/assets/mainpage/christmas/puzzle-4-frame.png',
      width: 700,
      height: 668,
      offset: {
        transform: 'translate(calc(-50%), 0)',
        transformOrigin: 'center',
        left: '50%',
      },
      zIndex: 1,
    },
    item: {
      width: 600,
      height: 600,
      zIndex: 0,
      offset: {
        transform: 'translate(calc(-50%), 0)',
        transformOrigin: 'center',
        left: '50%',
      },
    },
  },
] as const;

export default function PuzzleBox({ index, puzzle }: PuzzleBoxProps) {
  const { frame, item } = PUZZLE_FRAME_IMAGES[index];

  return (
    <Link href={`/main/christmas/puzzle/${puzzle.puzzleUid}`} className="absolute cursor-pointer z-[100]" style={frame.offset}>
      <div className="relative flex justify-center items-center">
        <Image src={frame.imageUrl} alt="" width={frame.width} height={frame.height} className="" style={{ zIndex: frame.zIndex }} />
        <Image
          src={puzzle.imageUrl}
          alt={`puzzle-${puzzle.puzzleIndex}`}
          width={item.width}
          height={item.height}
          className="absolute z-10"
          style={{ zIndex: item.zIndex, ...item.offset }}
        />
      </div>
    </Link>
  );
}