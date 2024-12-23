import React from 'react';
import Image from 'next/image';

import ItemMistletoe from '@/app/_components/_items/mistletoe';
import RewardPopup from '@/app/_components/_popup/reward';
import { getArtwork } from '@/app/_libs/api/artwork';
import PuzzlePiece from '@/app/_components/_button/christmas/puzzle-piece';

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

  console.log(completedCount);
  return (
    <>
      <RewardPopup rewardCode="snowman" className="hidden" />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[700px] h-[700px] relative shadow-[15px_15px_15px_0px_rgba(0,0,0,0.251)]">
          <Image
            src={artwork.imageUrl}
            alt={artwork.artworkTitle}
            width={ARTWORK_WIDTH}
            height={ARTWORK_WIDTH}
            className="absolute top-0 left-0 z-0"
            priority
          />
          <div className="z-10 absolute w-full h-full grid grid-cols-2 gap-0">
            {artwork.puzzles.map((puzzle) => (
              <PuzzlePiece key={puzzle.puzzleUid} puzzle={puzzle} />
            ))}
          </div>
          <Image src="/assets/artwork-page/christmas/artwork-ribbon.png" alt="" width={700} height={700} className="absolute top-0 left-0 z-20" />
        </div>
        <Image src="/assets/artwork-page/christmas/gift-tag.png" alt="" width={427} height={486} className="absolute top-[300px] right-[117px] z-20" />
        <Image
          src="/assets/artwork-page/christmas/unlock-gift.png"
          alt="Discover the magical pieces to unlock a christmas miracle"
          width={281}
          height={250}
          className="absolute top-[446px] right-[180px] z-20"
        />
        <ItemMistletoe className="absolute top-[569px] right-[46px] z-20" variant="artwork" />
      </div>
    </>
  );
}
