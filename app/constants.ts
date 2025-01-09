export const SCREEN_WIDTH = 1920;

export const SCREEN_HEIGHT = 1080;

export const URLS = {
  getMainPage: () => '/main',
  getLoginPage: () => '/login',
  getRootPage: () => '/',
  getMypagePage: () => '/mypage',
  getMypagePageByKind: (kind: 'gallery' | 'studio') => `/mypage/${kind}`,
  getArtworkPageByUid: (uid: string) => `/artwork/${uid}`,
  getPlaygroundPageByPuzzleUid: (uid: string) => `/playground/${uid}`,
  fetchThemeWithArtworksByUid: (themeUid: string) => `/themes/${themeUid}/artworks`,
  fetchArtworkPuzzlesByUid: (artworkUid: string) => `/artworks/${artworkUid}/puzzles`,
  fetchArtworkCompleted: () => `/artworks/completed`,
  fetchPuzzleByUid: (puzzleUid: string) => `/puzzles/${puzzleUid}`,
  createAuthToken: () => `/auth/login`,
  saveUserPuzzlePlays: (puzzlePlayUid: string) => `/puzzlePlays/${puzzlePlayUid}`,
  saveGuestPuzzlePlays: (puzzlePlayUid: string) => `/puzzlePlays/guest/${puzzlePlayUid}`,
  refreshToken: () => `/auth/token/refresh`,
} as const;
