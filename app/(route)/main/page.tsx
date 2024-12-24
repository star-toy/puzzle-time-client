import ArtworkBox from '@/app/_components/_ui/main/christmas/artwork-box';
import ButtonEnter from '@/app/_components/_ui/main/christmas/button-enter';
import { getTheme } from '@/app/_libs/api/theme';

export default async function MainPage() {
  // 서버 컴포넌트에서 직접 데이터 fetch
  const theme = await getTheme('theme-uid');

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full relative">
        {theme.artworks.map((artwork, index) => (
          <ArtworkBox key={artwork.artworkUid} artwork={artwork} index={index} />
        ))}

        <div className="absolute z-[100] bottom-[78px] left-[50%] -translate-x-1/2">
          <ButtonEnter />
        </div>
      </div>
    </div>
  );
}
