import Image from 'next/image';

import { Wrapper } from './base';
import LinkButton from '../_button/christmas/link-button';

interface IRewardPopupProps {
  className?: string;
  rewardCode: string;
}

const REWARDS = new Map<string, { imageUrl: string }>([
  ['time-ornament', { imageUrl: '/assets/puzzle-rewards/time-ornament.png' }],
  ['snowman', { imageUrl: '/assets/puzzle-rewards/snowman.png' }],
  ['mistletoe', { imageUrl: '/assets/puzzle-rewards/mistletoe.png' }],
  ['ginger-cookie-1', { imageUrl: '/assets/puzzle-rewards/ginger-cookie-1.png' }],
  ['ginger-cookie-2', { imageUrl: '/assets/puzzle-rewards/ginger-cookie-2.png' }],
]);

export default function RewardPopup({ rewardCode, className }: IRewardPopupProps) {
  const reward = REWARDS.get(rewardCode);
  if (!reward) return null;

  return (
    <Wrapper width="600px" height="600px" className={className}>
      <div className="w-full h-full relative">
        <h3 className="text-[30px] font-bold text-popup-primary mt-[63px] text-center">GET A REWARD!</h3>

        <div className="w-[300px] h-[300px] flex items-center justify-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 z-0 w-[300px] h-[300px] backdrop-blur-[100px] blur-2xl bg-white/80 rounded-full" />
          <Image
            src={reward.imageUrl}
            alt={rewardCode}
            width={200}
            height={200}
            className="absolute top-[50%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <LinkButton href="/mypage" className="absolute bottom-[75px] left-[50%] -translate-x-1/2">
          <span>GO TO MYPAGE</span>
        </LinkButton>
      </div>
    </Wrapper>
  );
}
