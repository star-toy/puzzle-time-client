import GameBoard from './_board';

import { fetchPuzzle } from '@/app/_libs/api/puzzle';
import type { IPuzzle } from '@/app/_types/puzzle';

export const runtime = 'edge';

interface IPlaygroundPageProps {
  params: Promise<{
    uid: string;
  }>;
}
export default async function PlaygroundPage({ params }: IPlaygroundPageProps) {
  const { uid } = await params;
  let puzzle: IPuzzle | null = null;
  try {
    puzzle = await fetchPuzzle(uid);
  } catch (error) {
    console.error(error);
  }

  if (!puzzle) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <GameBoard puzzle={puzzle} />
    </div>
  );
}
