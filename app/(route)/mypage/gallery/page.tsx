import ArtworkBox from './_artwork-box';

import { getTheme } from '@/app/_libs/api/theme';

export default async function GalleryPage() {
  const theme = await getTheme('123');

  return <ArtworkBox artworks={theme.artworks} />;
}
