import Image from 'next/image';

import { Wrapper } from './base';

import type { IArtwork } from '@/app/_types/artwork';

interface IShareArtworkPopupProps {
  artwork: IArtwork;
  onClose: () => void;
}

export default function ShareArtworkPopup({ artwork, onClose }: IShareArtworkPopupProps) {
  return (
    <Wrapper width="850px" height="1005px" onClose={onClose}>
      <div className="w-full h-full relative p-[50px] space-y-[30px]">
        <div className="w-[750px] h-[750px]">
          <Image src={artwork.imageUrl} alt={artwork.artworkTitle} width={750} height={750} className="" />
        </div>

        <div className="flex flex-row justify-between space-x-[50px]">
          <Image src="/assets/components/button/christmas/button-download.png" alt="download" width={350} height={125} />
          <Image src="/assets/components/button/christmas/button-share.png" alt="share" width={350} height={125} />
        </div>
      </div>
    </Wrapper>
  );
}
