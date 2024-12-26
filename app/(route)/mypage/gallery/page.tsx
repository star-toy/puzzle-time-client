import Image from 'next/image';

import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { fetchArtworkCompleted } from '@/app/_libs/api/artwork';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';

interface IRewardPosition {
  height: number;
  width: number;
  x: string;
  y: string;
}

const REWARD_POSITIONS = new Map<string, IRewardPosition>([
  ['RWD001', { x: '100px', y: '100px', width: 100, height: 100 }],
  ['RWD002', { x: '200px', y: '200px', width: 100, height: 100 }],
  ['RWD003', { x: '300px', y: '300px', width: 100, height: 100 }],
  ['RWD004', { x: '400px', y: '400px', width: 100, height: 100 }],
  ['RWD005', { x: 'left-[50%] translate-x-[-50%]', y: 'bottom-0', width: 1747, height: 167 }],
]);

const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function GalleryPage() {
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);
  const completedArtworks = await fetchArtworkCompleted();

  return (
    <div className="relative w-full h-full">
      <MypageNav activePage="gallery" className="fixed z-20 top-0 left-[50%] -translate-x-1/2 " />
      <ArtworkBox artworks={theme.artworks} className="absolute bottom-[235px] left-0 z-10" />

      <div className="absolute bottom-0 left-0 w-full border h-[235px]">
        <Image src="/assets/mypage/christmas/gallery-shelf.png" alt="" width={1920} height={80} className="absolute bottom-[135px] left-0 z-10" />

        <div className="absolute w-full h-[235px] bottom-0 left-0 z-10 border border-red-500">
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
                className={`absolute ${position.x} ${position.y} h-[${position.height}px] w-[${position.width}px]`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
