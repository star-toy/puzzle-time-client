'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Canvas, generators, painters } from 'headbreaker';

import { saveUserPuzzlePlays } from '@/app/_libs/api/puzzle';
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

  // const savePuzzlePlayMutation = useMutation({
  //   mutationFn: async () => saveUserPuzzlePlays(puzzle.),
  //   onError: (error) => {
  //     console.error('Failed to save puzzle play:', error);
  //   },
  // });

  const handleValidAllPieces = useCallback(() => {
    // const pieceNumber = localStorage.getItem('pieceNumber');

    // if (pieceNumber) {
    //   savePuzzlePlayMutation.mutate({
    //     artworkUid: puzzle.artworkUid,
    //     pieceNumber: Number(pieceNumber),
    //     puzzleUid: puzzle.puzzleUid,
    //   });
    // }

    puzzleRef.current?.attachSolvedValidator();
    // }, [puzzle, savePuzzlePlayMutation]);
  }, []);

  const initGame = useCallback(
    (pieceNumber: number) => {
      if (!pieceNumber) return;

      const image = new Image();
      image.src = puzzle.imageUrl;
      image.onload = () => {
        puzzleRef.current = initPuzzle({ image, pieceNumber, onValidAllPieces: handleValidAllPieces });
        window.dispatchEvent(new CustomEvent('game-started'));
      };
    },
    [handleValidAllPieces, puzzle],
  );

  useEffect(() => {
    const pieceNumber = localStorage.getItem('pieceNumber') || 16;
    initGame(Number(pieceNumber));

    const handlePieceNumberSelected = (event: CustomEvent) => {
      const selectedPieceNumber = event.detail;
      initGame(Number(selectedPieceNumber));
    };
    window.addEventListener('piece-number-selected', handlePieceNumberSelected as EventListener);
    return () => {
      window.removeEventListener('piece-number-selected', handlePieceNumberSelected as EventListener);
    };
  }, [initGame]);

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

interface IInitPuzzleParams {
  image: HTMLImageElement;
  onValidAllPieces: () => void;
  pieceNumber: number;
}

function initPuzzle({ image, pieceNumber, onValidAllPieces }: IInitPuzzleParams) {
  const soundConnect = new Audio('/assets/sound/connect.wav');

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

  canvas.onConnect((piece, figure, target, targetFigure) => {
    soundConnect.play().catch(() => {});
    figure.shape.stroke('yellow');
    targetFigure.shape.stroke('yellow');

    setTimeout(() => {
      figure.shape.stroke('black');
      targetFigure.shape.stroke('black');
      canvas.redraw();
    }, 200);
  });
  canvas.onDisconnect((it) => {
    soundConnect.play().catch(() => {});
  });
  canvas.onValid(() => {
    setTimeout(() => {
      onValidAllPieces();
    }, 1500);
  });
  canvas.shuffle(0.7);
  canvas.registerKeyboardGestures();
  canvas.draw();
  return canvas;
}
