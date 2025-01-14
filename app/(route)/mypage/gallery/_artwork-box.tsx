'use client';

import { useState } from 'react';
import cx from 'clsx';
import Image from 'next/image';

import ShareArtworkPopup from '@/app/_components/_popup/share-artwork';
import type { IArtwork } from '@/app/_types/artwork';

interface IArtworkBoxProps {
  artworks: IArtwork[];
  className?: string;
}

export default function ArtworkBox({ artworks, className }: IArtworkBoxProps) {
  const [artworkNumber, setArtworkNumber] = useState<number | null>(null);

  const handleOpen = (number: number) => {
    setArtworkNumber(number);
  };

  const handleClose = () => {
    setArtworkNumber(null);
  };

  return (
    <>
      <div className={cx('overflow-x-hidden w-full', className)}>
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full overflow-x-auto">
            <div className="min-w-max flex flex-row items-end h-[450px]">
              {artworks.map((artwork, index) => (
                <button
                  type="button"
                  key={artwork.artworkUid}
                  className="relative pl-[100px] [&:last-child]:pr-[100px] cursor-pointer"
                  onClick={() => handleOpen(index)}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpen(index)}
                  tabIndex={0}
                >
                  <Image src={artwork.imageUrl} alt={artwork.artworkUid} width={450} height={450} className="shadow-[10px_10px_10px_0px_rgba(0,0,0,0.251)]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {artworkNumber !== null && <ShareArtworkPopup artwork={artworks[artworkNumber]} onClose={handleClose} />}
    </>
  );
}
