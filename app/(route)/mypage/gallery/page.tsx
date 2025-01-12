export const runtime = 'edge';

import Image from 'next/image';
import type { Session } from 'next-auth';

import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';
import type { IArtworkReward } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';
import { auth } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

interface IRewardPosition {
  extra?: string;
  height: number;
  width: number;
  x: string;
  y: string;
}

const REWARD_POSITIONS = new Map<string, IRewardPosition>([
  ['RWD001', { x: 'left-[50%] translate-x-[-50%]', y: 'top-[14px]', width: 350, height: 130 }],
  ['RWD002', { x: 'left-[675px]', y: 'top-[-130px]', width: 100, height: 130, extra: 'rotate-[-7.5deg]' }],
  ['RWD003', { x: 'left-[1192px]', y: 'top-[-130px]', width: 100, height: 130 }],
  ['RWD004', { x: 'left-[77px]', y: 'top-[-221px]', width: 150, height: 231 }],
  ['RWD005', { x: 'left-[50%] translate-x-[-50%]', y: 'bottom-[-12px]', width: 1747, height: 167 }],
]);

const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function GalleryPage() {
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);
  // const completedArtworks = await fetchArtworkCompleted();
  const session = (await auth()) as Session & { data: { accessToken: string } };
  const response = await fetch(`${API_URL}${URLS.fetchArtworkCompleted()}`, {
    headers: {
      Cookie: `token=${session?.accessToken}`,
    },
  });

  const completedArtworks = (await response.json()) as IArtworkReward[];

  return (
    <div className="relative w-full h-full">
      <MypageNav activePage="gallery" className="fixed z-20 top-0 left-[50%] -translate-x-1/2 " />
      <ArtworkBox artworks={theme.artworks} className="absolute bottom-[235px] left-0 z-10" />

      <div className="absolute bottom-0 left-0 w-full border h-[235px]">
        <Image src="/assets/mypage/christmas/gallery-shelf.png" alt="" width={1920} height={80} className="absolute bottom-[135px] left-0 z-10" />

        <div className="absolute w-full h-[235px] bottom-0 left-0 z-10">
          {completedArtworks.map((reward: IArtworkReward) => {
            const position = REWARD_POSITIONS.get(reward.rewardCode);
            if (!position) return null;

            return (
              <Image
                key={reward.rewardCode}
                src={reward.rewardImgUrl}
                alt=""
                width={position.width}
                height={position.height}
                className={`absolute ${position.x} ${position.y} h-[${position.height}px] w-[${position.width}px] ${position.extra}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
