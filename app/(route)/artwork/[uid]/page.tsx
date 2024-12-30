export const runtime = 'edge';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import PuzzlePiece from '@/app/_components/_button/christmas/puzzle-piece';
import ItemMistletoe from '@/app/_components/_items/mistletoe';
import RewardPopup from '@/app/_components/_popup/reward';
import RipArtwork from '@/app/_components/_ui/artwork/christmas/rip-artwork';
import { fetchArtworkPuzzles } from '@/app/_libs/api/artwork';
import { URLS } from '@/app/constants';

interface IArtworkDetailPageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function ArtworkDetailPage({ params }: IArtworkDetailPageProps) {
  const { uid } = await params;
  const artwork = await fetchArtworkPuzzles(uid);

  return (
    <>
      <RewardPopup rewardCode="snowman" className="hidden" />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[700px] h-[700px] relative shadow-[15px_15px_15px_0px_rgba(0,0,0,0.251)]">
          <div className="absolute w-full z-10 h-full grid grid-cols-2 gap-0">
            {artwork.puzzles.map((puzzle) => (
              <PuzzlePiece key={puzzle.puzzleUid} puzzle={puzzle} />
            ))}
          </div>
          <RipArtwork artwork={artwork} className="w-full h-full absolute top-0 left-0 z-20" variant="detail" />
          <div className="absolute w-full z-30 h-full grid grid-cols-2 gap-0">
            {artwork.puzzles.map((puzzle) => (
              <Link key={puzzle.puzzleUid} href={URLS.getPlaygroundPageByPuzzleUid(puzzle.puzzleUid)} className="w-full h-full" />
            ))}
          </div>
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
