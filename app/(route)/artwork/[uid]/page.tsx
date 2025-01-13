'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import PuzzlePiece from '@/app/_components/_button/christmas/puzzle-piece';
import ItemMistletoe from '@/app/_components/_items/mistletoe';
import RewardPopup from '@/app/_components/_popup/reward';
import RipArtwork from '@/app/_components/_ui/artwork/christmas/rip-artwork';
import type { IArtworkDetail } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';

export const runtime = 'edge';

export default function ArtworkPage({ params }: { params: Promise<{ uid: string }> }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [artwork, setArtwork] = useState<IArtworkDetail | null>(null);

  useEffect(() => {
    if (!session) {
      router.push(URLS.getLoginPage());
      return;
    }

    const fetchArtwork = async () => {
      const { uid } = await params;
      try {
        const response = await fetch(URLS.fetchArtworkPuzzlesByUidClient(uid), {
          headers: {
            Authorization: session.accessToken || '',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch artwork');
        }
        const data = await response.json();
        setArtwork(data as IArtworkDetail);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        router.push(URLS.getRootPage());
      }
    };
    fetchArtwork().catch(() => {
      router.push(URLS.getRootPage());
    });
  }, [session, router, params]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

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
          <RipArtwork artwork={artwork} className="w-full h-full absolute top-0 left-0 z-20" />
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/artwork-page/christmas/ribbon-horizontal.png"
            alt=""
            width={700}
            height={100}
            className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"
          />
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/artwork-page/christmas/ribbon-vertical.png"
            alt=""
            width={100}
            height={700}
            className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] z-20"
          />
          <div className="absolute w-full z-30 h-full grid grid-cols-2 gap-0">
            {artwork.puzzles.map((puzzle) => (
              <Link key={puzzle.puzzleUid} href={URLS.getPlaygroundPageByPuzzleUid(puzzle.puzzleUid)} className="w-full h-full" />
            ))}
          </div>
        </div>
        <Image
          src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/artwork-page/christmas/gift-tag.png"
          alt=""
          width={427}
          height={486}
          className="absolute top-[300px] right-[117px] z-20"
        />
        <Image
          src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/artwork-page/christmas/unlock-gift.png"
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
