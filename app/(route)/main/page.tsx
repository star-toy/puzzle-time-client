'use client';

import { useQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import ArtworkBox from '@/app/_components/_ui/main/christmas/artwork-box';
import ButtonEnter from '@/app/_components/_ui/main/christmas/button-enter';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';

// 크리스마스 theme 하나만 출시해서 임시로 하드코딩
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default function MainPage() {
  const { data: session } = useSession();
  const isLogin = !!(session as Session & { accessToken: string })?.accessToken;

  const {
    data: theme,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['theme', THEME_UID],
    queryFn: () => fetchThemeWithArtworksByUid(THEME_UID),
  });

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

  if (error) {
    return <div>Error loading theme</div>; // 에러 상태 처리
  }

  if (!theme) {
    return null;
  }

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full relative">
        {theme.artworks.map((artwork, index) => (
          <ArtworkBox key={artwork.artworkUid} artwork={artwork} index={index} />
        ))}

        <div className="absolute z-[100] bottom-[78px] left-[50%] -translate-x-1/2">
          <ButtonEnter isLogin={isLogin} />
        </div>
      </div>
    </div>
  );
}
