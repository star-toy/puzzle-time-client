import type { IPuzzle } from './puzzle';

export interface IArtwork {
  artworkDescription: string;
  artworkSeq: number;
  artworkTitle: string;
  artworkUid: string;
}

export interface IArtworkDetail {
  artwork: IArtwork;
  email: string; // 로그인 여부
  puzzles: IPuzzle[];
}
