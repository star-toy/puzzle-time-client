'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { IArtwork } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';

interface IArtworkBoxProps {
  artwork: IArtwork;
  index: number;
}

const ARTWORK_FRAME_IMAGES = [
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
      borderRadius: 'none',
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
      borderRadius: 'none',
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
      borderRadius: 'none',
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
      borderRadius: 'none',
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
      borderRadius: '100%',
    },
  },
] as const;

export default function ArtworkBox({ index, artwork }: IArtworkBoxProps) {
  const { frame, item } = ARTWORK_FRAME_IMAGES[index];

  return (
    <Link href={URLS.getArtworkPageByUid(artwork.artworkUid)} className="absolute cursor-pointer z-[100]" style={frame.offset}>
      <div className="relative flex justify-center items-center">
        <Image
          src={frame.imageUrl}
          alt=""
          width={frame.width}
          height={frame.height}
          loading="eager"
          quality={85}
          className=""
          style={{ zIndex: frame.zIndex }}
        />
        <Image
          src={artwork.imageUrl}
          alt={`artwork-${artwork.artworkSeq}`}
          loading="eager"
          quality={85}
          width={item.width}
          height={item.height}
          className="absolute z-10"
          style={{ zIndex: item.zIndex, ...item.offset, borderRadius: item.borderRadius }}
        />
      </div>
    </Link>
  );
}
