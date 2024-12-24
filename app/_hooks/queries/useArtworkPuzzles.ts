import { useQuery } from '@tanstack/react-query';

import { fetchArtwork } from '@/app/_libs/api/artwork';

export function useArtwork() {
  return useQuery({
    queryKey: ['artwork'],
    queryFn: fetchArtwork,
  });
}
