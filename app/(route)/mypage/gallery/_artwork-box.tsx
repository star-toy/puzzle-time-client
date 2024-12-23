'use client';

import { useState } from 'react';
import Image from 'next/image';

import ShareArtworkPopup from '@/app/_components/_popup/share-artwork';
import type { IArtwork } from '@/app/_types/artwork';

interface IArtworkBoxProps {
  artworks: IArtwork[];
}

export default function ArtworkBox({ artworks }: IArtworkBoxProps) {
  const [artworkNumber, setArtworkNumber] = useState<number | null>(null);

  const handleOpen = (number: number) => {
    setArtworkNumber(number);
  };

  const handleClose = () => {
    setArtworkNumber(null);
  };

  return (
    <>
      <div className="overflow-x-hidden absolute bottom-[235px] left-0 w-full z-10">
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full overflow-x-auto">
            <div className="min-w-max flex flex-row items-end h-[450px]">
              {artworks.map((artwork, index) => (
                <div key={artwork.artworkUid} className="relative pl-[100px] [&:last-child]:pr-[100px] cursor-pointer" onClick={() => handleOpen(index)}>
                  <Image src={artwork.imageUrl} alt={artwork.artworkUid} width={450} height={450} className="shadow-[10px_10px_10px_0px_rgba(0,0,0,0.251)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {artworkNumber !== null && <ShareArtworkPopup artwork={artworks[artworkNumber]} onClose={handleClose} />}
    </>
  );
}
