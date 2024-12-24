import ArtworkBox from '@/app/_components/_ui/main/christmas/artwork-box';
import ButtonEnter from '@/app/_components/_ui/main/christmas/button-enter';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';

// 크리스마스 theme 하나만 출시해서 임시로 하드코딩
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function MainPage() {
  // 서버 컴포넌트에서 직접 데이터 fetch
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);

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
