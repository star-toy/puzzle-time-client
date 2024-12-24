import Image from 'next/image';

import type { IPuzzle } from '@/app/_types/puzzle';

interface IPuzzlePieceProps {
  className?: string;
  height?: number;
  puzzle: IPuzzle;
  width?: number;
}

export default function PuzzlePiece({ className, puzzle, width = 350, height = 350 }: IPuzzlePieceProps) {
  return (
    <div className={className} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image key={puzzle.puzzleUid} alt={`${puzzle.puzzleIndex}번째 퍼즐`} src={puzzle.imageUrl} width={width} height={height} />
      {!puzzle.isCompleted && <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/[0.15] " />}
    </div>
  );
}
