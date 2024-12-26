import Image from 'next/image';

import RipArtwork from './rip-artwork';

import type { IArtworkDetail } from '@/app/_types/artwork';

export default function ArtworkPuzzles({ artwork, width, height }: { artwork: IArtworkDetail; height: number; width: number }) {
  const pieceWidth = width / 2;
  const pieceHeight = height / 2;

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full grid grid-cols-2">
        {artwork.puzzles.map((puzzle) => (
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
      <RipArtwork artwork={artwork} className="absolute z-50 top-0 left-0 w-full h-full " variant="list" />
    </div>
  );
}
