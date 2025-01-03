'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, generators, painters } from 'headbreaker';

import type { IPuzzle } from '@/app/_types/puzzle';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/app/constants';

export const runtime = 'edge';

interface IGameBoardProps {
  puzzle: IPuzzle;
}

const PADDING_Y = 80;
const PUZZLE_BOARD_ID = 'puzzle-board';

export default function GameBoard({ puzzle }: IGameBoardProps) {
  const puzzleRef = useRef(null);

  console.log(44444, puzzle);

  useEffect(() => {
    if (!puzzleRef.current) return;

    initPuzzle({ imageUrl: 'https://d2429op99n3dja.cloudfront.net/snowman_2.jpg' });
  }, []);

  if (!puzzle) return null;

  return <div ref={puzzleRef} id={PUZZLE_BOARD_ID} className="w-full h-full" />;
}

function initPuzzle({ imageUrl }: { imageUrl: string }) {
  const image = new Image();
  image.src = imageUrl;
  image.onload = () => {
    const canvas = new Canvas(PUZZLE_BOARD_ID, {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - PADDING_Y * 2,
      pieceSize: 100,
      proximity: 20,
      preventOffstageDrag: true,
      fixed: true,
      borderFill: 10,
      strokeWidth: 2,
      lineSoftness: 0.18,
      image,
      painter: new painters.Konva(), // <-- this is important. See https://github.com/flbulgarelli/headbreaker/issues/51
    });

    canvas.adjustImagesToPuzzleHeight();
    canvas.onValid(() => {
      console.log('valid');
    });

    canvas.autogenerate({
      insertsGenerator: generators.flipflop,
      horizontalPiecesCount: 4,
      verticalPiecesCount: 4,
      metadata: [{ color: '#B83361' }, { color: '#B87D32' }, { color: '#A4C234' }, { color: '#37AB8C' }],
    });

    canvas.shuffle(0.7);
    canvas.draw();
  };
}
