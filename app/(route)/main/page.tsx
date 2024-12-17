import ButtonEnter from '@/app/_components/_ui/main/christmas/button-enter';
import PuzzleBox from '@/app/_components/_ui/main/christmas/puzzlebox';
import { getArtwork } from '@/app/_libs/api/artwork';

export default async function MainPage() {
  // 서버 컴포넌트에서 직접 데이터 fetch
  const artworks = await getArtwork('artwork-uid');

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full relative">
        {artworks.puzzles.map((puzzle, index) => (
          <PuzzleBox key={puzzle.puzzleUid} puzzle={puzzle} index={index} />
        ))}

        <div className="w-full flex justify-center items-center absolute bottom-0 pb-[78px]">
          <ButtonEnter />
        </div>
      </div>
    </div>
  );
}
