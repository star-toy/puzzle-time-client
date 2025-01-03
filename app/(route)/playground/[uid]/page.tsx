import GameBoard from './_board';

import { fetchPuzzle } from '@/app/_libs/api/puzzle';

export const runtime = 'edge';

interface IPlaygroundPageProps {
  params: Promise<{
    uid: string;
  }>;
}
export default async function PlaygroundPage({ params }: IPlaygroundPageProps) {
  const { uid } = await params;
  const puzzle = await fetchPuzzle(uid);

  if (!puzzle) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <GameBoard puzzle={puzzle} />
    </div>
  );
}
