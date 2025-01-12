'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Canvas, generators, painters } from 'headbreaker';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { GameClearPopup } from '@/app/_components/_popup/in-game';
import type { IPuzzle, IPuzzlePlay } from '@/app/_types/puzzle';
import { encryptData } from '@/app/_utils/crypto';
import { SCREEN_HEIGHT, SCREEN_WIDTH, URLS } from '@/app/constants';

export const runtime = 'edge';

interface IGameBoardProps {
  publicKey: string;
  puzzleUid: string;
}

const PADDING_Y = 80;
const PUZZLE_BOARD_ID = 'puzzle-board';

export default function GameBoard({ publicKey, puzzleUid }: IGameBoardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [clearGame, setClearGame] = useState<null | IPuzzlePlay>(null);

  const puzzleRef = useRef<Canvas | null>(null);

  const { data: puzzle } = useQuery<IPuzzle>({
    queryKey: ['puzzle', puzzleUid],
    queryFn: async () => {
      const response = await fetch(URLS.fetchPuzzleByUidClient(puzzleUid), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.accessToken || '',
        },
      });
      return response.json() as Promise<IPuzzle>;
    },
    enabled: !!session?.accessToken,
  });

  const savePuzzlePlayMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey) throw new Error('Public key not available');
      if (!puzzle) throw new Error('Puzzle not available');

      const puzzleData = {
        isCompleted: true,
        puzzlePlayData: {},
        puzzleUid,
      };

      const encryptedData = await encryptData(publicKey, puzzleData);

      const response = await fetch(`/api/playing/${puzzle.puzzlePlayUid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${session?.accessToken}`,
        },
        body: JSON.stringify(encryptedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save puzzle play');
      }

      const data = await response.json() as IPuzzlePlay;
      setClearGame(data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Puzzle play saved:', data);
    },
    onError: (error) => {
      console.error('Failed to save puzzle play:', error);
    },
  });

  const handleValidAllPieces = useCallback(() => {
    puzzleRef.current?.attachSolvedValidator();
    savePuzzlePlayMutation.mutate();
  }, [savePuzzlePlayMutation]);

  const initGame = useCallback(
    (pieceNumber: number) => {
      if (!pieceNumber || !puzzle) return;

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

  const handleSaveAndLeave = () => {
    console.log('save and leave');
  };

  const handleBack = () => {
    setClearGame(null);
  };

  const handleMyPage = () => {
    setClearGame(null);
    router.push(URLS.getMypagePage());
  };

  if (!puzzle) return null;

  return (
    <>
      <div id={PUZZLE_BOARD_ID} className="w-full h-full" />

      {!!clearGame && <GameClearPopup onBack={handleBack} onMyPage={handleMyPage} puzzlePlay={clearGame} />}
    </>
  );
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
    soundConnect.play().catch(() => { });
    figure.shape.stroke('yellow');
    targetFigure.shape.stroke('yellow');

    setTimeout(() => {
      figure.shape.stroke('black');
      targetFigure.shape.stroke('black');
      canvas.redraw();
    }, 200);
  });
  canvas.onDisconnect((it) => {
    soundConnect.play().catch(() => { });
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
