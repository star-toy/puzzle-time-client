import type { IArtwork } from './artwork';

export interface IThemeDetail {
  artworks: IArtwork[];
  bgm: {
    bgmId: number;
    bgmTitle: string;
    bgmUrl: string;
  };
  themeImageUrl: string;
  themeTitle: string;
  themeUid: string;
}
