export const SCREEN_WIDTH = 1920;

export const SCREEN_HEIGHT = 1080;

export const URLS = {
  getMainPage: () => '/main',
  getLogoutPage: () => '/',
  getMypagePage: () => '/mypage',
  getMypagePageByKind: (kind: 'gallery' | 'studio') => `/mypage/${kind}`,
  getArtworkPageByUid: (uid: string) => `/artwork/${uid}`,
  getPlaygroundPageByPuzzleUid: (uid: string) => `/playground/${uid}`,
} as const;
