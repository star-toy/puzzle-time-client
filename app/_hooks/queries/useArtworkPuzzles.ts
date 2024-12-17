import { useQuery } from '@tanstack/react-query';

import { getArtwork } from '@/app/_libs/api/artwork';

export function useArtwork() {
  return useQuery({
    queryKey: ['artwork'],
    queryFn: getArtwork,
  });
}
