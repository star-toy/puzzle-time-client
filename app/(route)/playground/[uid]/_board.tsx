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
  const puzzleRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const pieceNumber = localStorage.getItem('pieceNumber');
    if (!pieceNumber) return;

    const image = new Image();
    image.src = puzzle.imageUrl;
    image.onload = () => {
      puzzleRef.current = initPuzzle({ image, pieceNumber: Number(pieceNumber) });
      window.dispatchEvent(new CustomEvent('game-started'));
    };
  }, [puzzle]);

  useEffect(() => {
    const handleRearrangePieces = () => {
      puzzleRef.current?.shuffle(0.45);
      puzzleRef.current?.redraw();
    };
    window.addEventListener('rearrange-pieces', handleRearrangePieces);
    return () => {
      window.removeEventListener('rearrange-pieces', handleRearrangePieces);
    };
  }, []);

  if (!puzzle) return null;

  return <div id={PUZZLE_BOARD_ID} className="w-full h-full" />;
}

function initPuzzle({ image, pieceNumber }: { image: HTMLImageElement; pieceNumber: number }) {
  const canvas = new Canvas(PUZZLE_BOARD_ID, {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - PADDING_Y * 2,
    pieceSize: 100,
    proximity: 20,
    preventOffstageDrag: true,
    fixed: true,
    borderFill: 10,
    strokeWidth: 4,
    lineSoftness: 0.18,
    image,
    painter: new painters.Konva(), // <-- this is important. See https://github.com/flbulgarelli/headbreaker/issues/51
  });

  canvas.adjustImagesToPuzzleHeight();

  const pieceCount = Math.sqrt(pieceNumber);
  canvas.autogenerate({
    insertsGenerator: generators.flipflop,
    horizontalPiecesCount: pieceCount,
    verticalPiecesCount: pieceCount,
    metadata: [{ color: '#B83361' }, { color: '#B87D32' }, { color: '#A4C234' }, { color: '#37AB8C' }],
  });
  canvas.attachSolvedValidator();
  canvas.onValid(() => {
    alert('valid');
  });
  canvas.shuffle(0.7);
  canvas.draw();
  return canvas;
}
