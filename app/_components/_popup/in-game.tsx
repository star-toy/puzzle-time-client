'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button, Wrapper } from './base';

import type { IPuzzlePlay } from '@/app/_types/puzzle';

interface IGameClearPopupProps {
  onBack: () => void;
  onMyPage: () => void;
  puzzlePlay: IPuzzlePlay;
}

interface IBubble {
  bottom: number;
  id: number;
  left?: number;
  opacity: number;
  right?: number;
  scale: number;
  top?: number;
}

const CLAP_OFFSETS = [
  { right: 140, destY: 211 }, // destY == distance from bottom
  { left: 144, destY: 158 },
  { right: 80, destY: 70 },
  { left: 110, destY: 50 },
];

export function GameClearPopup({ onBack, onMyPage, puzzlePlay }: IGameClearPopupProps) {
  const [bubbles, setBubbles] = useState<IBubble[]>([]);

  useEffect(() => {
    const [numerator] = puzzlePlay.completedPuzzlesFraction.split('/').map(Number);
    const initialBubbles = Array.from({ length: numerator }, (_, index) => ({
      id: index,
      ...CLAP_OFFSETS[index],
      bottom: 0 + Math.random() * 100, // 시작 높이도 약간 다르게
      opacity: Math.random() + 0.5,
      scale: 0.9 + Math.random() * 0.4,
    }));
    setBubbles(initialBubbles);

    const animationInterval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble, index) => ({
            ...bubble,
            bottom: bubble.bottom + (CLAP_OFFSETS[index]?.destY || bubble.bottom) <= bubble.bottom ? bubble.bottom : bubble.bottom + 2, // 위로 이동
            opacity: bubble.bottom / (CLAP_OFFSETS[index]?.destY || bubble.bottom) > 0.5 ? bubble.opacity - 0.02 : bubble.opacity, // 50% 위치부터 서서히 사라짐
          }))
          .filter((bubble) => bubble.opacity > 0),
      );
    }, 16); // 약 60fps

    return () => clearInterval(animationInterval);
  }, [puzzlePlay]);

  return (
    <Wrapper width="700px" height="auto">
      <div className="relative w-full py-9 flex flex-col items-center justify-center border border-red-500">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: bubble.left ? `${bubble.left}px` : undefined,
              right: bubble.right ? `${bubble.right}px` : undefined,
              top: bubble.top ? `${bubble.top}px` : undefined,
              bottom: `${bubble.bottom}px`,
              opacity: bubble.opacity,
              transform: `scale(${bubble.scale})`,
            }}
          >
            <Image
              src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/playground/christmas/icon-clap.png"
              alt="clap"
              width={60}
              height={60}
              className="w-[60px] h-[60px]"
            />
          </div>
        ))}

        <div className="space-y-[30px] w-full text-center">
          <div className="text-[#4D1818] text-[30px] font-bold">Congratulations!</div>

          <div className="text-[#4D1818] text-center text-[20px]">
            <p>You have unlocked</p>
            <p className="text-[#A65043] text-[50px] font-bold">{puzzlePlay.completedPuzzlesFraction}</p>
            <p>puzzle!</p>
          </div>

          <div className="space-x-[50px]">
            <Button onClick={onBack}>Go back</Button>
            <Button onClick={onMyPage}>Go to MyPage</Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
