import { useEffect } from 'react';
import Image from 'next/image';

import { Button, Wrapper } from './base';

interface IAlertLeaveGamePopupProps {
  onContinue: () => void;
  onSaveAndLeave: () => void;
}

export function AlertLeaveGamePopup({ onSaveAndLeave, onContinue }: IAlertLeaveGamePopupProps) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('game-clear'));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-[#F3E5CE] w-[700px] text-[#4D1818] pt-[42px] pb-[36px] flex flex-col items-center justify-center space-y-[30px]">
        <div className="text-[30px] text-center">
          <p>Are you sure you want to leave this page?</p>
          <p>Let&apos;s make magic happen!</p>
        </div>

        <Image src="/assets/logo.png" alt="Puzzle Time" width={50} height={50} />

        <div className="space-y-[15px]">
          <p className="text-[20px]">If you still want to leave the page, save and continue later.</p>

          <div className="flex space-x-[50px]">
            <button
              type="button"
              className="bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] w-[150px] h-[40px] rounded-[5px] text-[20px]"
              onClick={onSaveAndLeave}
            >
              Save and leave
            </button>
            <button
              type="button"
              className="bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] w-[150px] h-[40px] rounded-[5px] text-[20px]"
              onClick={onContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IGameClearPopupProps {
  onBack: () => void;
  onMyPage: () => void;
  puzzleNumber: number;
}

export function GameClearPopup({ onBack, onMyPage, puzzleNumber }: IGameClearPopupProps) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('game-clear'));
  }, []);

  return (
    <Wrapper>
      <div className="bg-[#F3E5CE] w-[700px] text-[#4D1818] pt-[42px] pb-[36px] flex flex-col items-center justify-center space-y-[30px]">
        <div className="text-[30px] text-center font-bold">
          <p>Congratulations!</p>
        </div>

        <div className="text-center">
          <p className="text-[20px]">You have unlocked</p>
          <p className="text-[50px]">{puzzleNumber} / 4</p>
          <p className="text-[20px]">puzzle!</p>
        </div>

        <div className="space-y-[15px]">
          <div className="flex space-x-[50px]">
            <Button onClick={onBack}>Go back</Button>
            <Button onClick={onMyPage}>Go to MyPage</Button>
          </div>
        </div>
      </div>
      <Image src="/assets/playground/christmas/icon-clap.png" alt="clap" width={60} height={60} />
    </Wrapper>
  );
}
