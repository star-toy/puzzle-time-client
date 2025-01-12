export const runtime = 'edge';

import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth';

import MypageNav from '@/app/_components/_nav/mypage';
import ArtworkPuzzles from '@/app/_components/_ui/artwork/christmas/artwork-puzzles';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';
import type { IArtworkDetail } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';
import { auth } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function StudioPage() {
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);

  return (
    <div className="w-full h-full overflow-x-auto">
      <MypageNav activePage="studio" className="fixed z-20 top-0 left-[50%] -translate-x-1/2 " />
      <div className="min-w-max flex flex-row items-end h-[680px]">
        {theme.artworks.map((artwork) => (
          <ArtworkPuzzlesItem key={artwork.artworkUid} artworkUid={artwork.artworkUid} />
        ))}
      </div>
    </div>
  );
}

async function ArtworkPuzzlesItem({ artworkUid }: { artworkUid: string }) {
  const session = (await auth()) as Session & { data: { accessToken: string } };
  const response = await fetch(`${API_URL}${URLS.fetchArtworkPuzzlesByUidServer(artworkUid)}`, {
    headers: {
      Cookie: `token=${session?.data?.accessToken}`,
    },
  });
  const artwork = (await response.json()) as IArtworkDetail;

  return (
    <Easel key={artwork.artwork.artworkUid}>
      <Link href={URLS.getArtworkPageByUid(artwork.artwork.artworkUid)} className="">
        <ArtworkPuzzles artwork={artwork} width={450} height={450} />
      </Link>
    </Easel>
  );
}

function Easel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-[100px] [&:last-child]:pr-[100px]">
      <div className="relative flex-shrink-0 w-[530px] h-[700px]">
        <Image src="/assets/mypage/christmas/easel.png" alt="" width={530} height={700} className="w-[530px] h-[700px]" />

        <div className="absolute top-[87px] left-[50%] -translate-x-1/2 w-[450px] h-[450px]">{children}</div>
      </div>
    </div>
  );
}
