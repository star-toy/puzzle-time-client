import React from 'react';
import Image from 'next/image';

import { getArtwork } from '@/app/_libs/api/artwork';

interface IArtworkDetailPageProps {
  params: {
    uid: string;
  };
}

const ARTWORK_WIDTH = 700;
const PUZZLE_WIDTH = ARTWORK_WIDTH / 2;

export default async function ArtworkDetailPage({ params: { uid } }: IArtworkDetailPageProps) {
  const artwork = await getArtwork(uid);
  const completedCount = artwork.puzzles.filter((puzzle) => puzzle.isCompleted).length;

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="w-[700px] h-[700px] relative shadow-[15px_15px_30px_20px_rgba(0,0,0,0.251)]">
        <Image src={artwork.imageUrl} alt={artwork.artworkTitle} width={ARTWORK_WIDTH} height={ARTWORK_WIDTH} className="absolute top-0 left-0 z-0" priority />
        <div className="z-10 absolute w-full h-full grid grid-cols-2 gap-0">
          {artwork.puzzles.map((puzzle, index) => (
            <Image key={puzzle.puzzleUid} alt={`${index}번째 퍼즐`} src={puzzle.imageUrl} width={PUZZLE_WIDTH} height={PUZZLE_WIDTH} />
          ))}
        </div>
      </div>
    </div>
  );
}
