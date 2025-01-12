import GameBoard from './_board';

export const runtime = 'edge';

const { PUZZLE_PUBLIC_KEY } = process.env;

interface IPlaygroundPageProps {
  params: Promise<{
    uid: string[];
  }>;
}
export default async function PlaygroundPage({ params }: IPlaygroundPageProps) {
  const { uid } = await params;
  const puzzleUid = uid[0];
  if (!puzzleUid || puzzleUid === 'undefined') {
    return null;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <GameBoard puzzleUid={puzzleUid} publicKey={PUZZLE_PUBLIC_KEY as string} />
    </div>
  );
}
