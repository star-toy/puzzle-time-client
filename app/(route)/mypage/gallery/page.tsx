import Image from 'next/image';

import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { fetchArtworkCompleted } from '@/app/_libs/api/artwork';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';

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
  const completedArtworks = await fetchArtworkCompleted();

  console.log(completedArtworks);

  return (
    <div className="relative w-full h-full">
      <MypageNav activePage="gallery" className="fixed z-20 top-0 left-[50%] -translate-x-1/2 " />
      <ArtworkBox artworks={theme.artworks} className="absolute bottom-[235px] left-0 z-10" />

      <div className="absolute bottom-0 left-0 w-full border h-[235px]">
        <Image src="/assets/mypage/christmas/gallery-shelf.png" alt="" width={1920} height={80} className="absolute bottom-[135px] left-0 z-10" />

        <div className="absolute w-full h-[235px] bottom-0 left-0 z-10">
          {completedArtworks.map((reward) => {
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
