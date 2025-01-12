'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import ArtworkBox from '@/app/_components/_ui/main/christmas/artwork-box';
import ButtonEnter from '@/app/_components/_ui/main/christmas/button-enter';
import type { IThemeDetail } from '@/app/_types/theme';
import { isTokenExpired } from '@/app/_utils/jwt';
import { URLS } from '@/app/constants';

// 크리스마스 theme 하나만 출시해서 임시로 하드코딩
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export default function MainPage() {
  const { data: session } = useSession();
  const isExpired = isTokenExpired(session?.accessToken);

  const { data: theme, error } = useQuery({
    queryKey: ['theme', THEME_UID],
    queryFn: async () => {
      const response = await fetch(`${API_URL}${URLS.fetchThemeWithArtworksByUid(THEME_UID)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${session?.accessToken}`,
        },
      });
      return response.json() as Promise<IThemeDetail>;
    },
    enabled: !isExpired,
    throwOnError: true,
  });

  if (error) {
    return <div>Error loading theme. {error.message}</div>; // 에러 상태 처리
  }

  if (!theme) {
    return null;
  }

  return (
    <div className="w-full h-full relative">
      {theme.artworks.map((artwork, index) => (
        <ArtworkBox key={artwork.artworkUid} artwork={artwork} index={index} />
      ))}

      <div className="absolute z-[100] bottom-[78px] left-[50%] -translate-x-1/2">
        <ButtonEnter isLogin={!isExpired} />
      </div>
    </div>
  );
}
