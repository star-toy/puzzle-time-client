import type { IPuzzle } from './puzzle';

export interface IArtwork {
  artworkDescription: string;
  artworkSeq: number;
  artworkTitle: string;
  artworkUid: string;
  imageUrl: string;
}

export interface IArtworkDetail {
  artwork: IArtwork;
  email: string; // 로그인 여부
  puzzles: IPuzzle[];
}

export interface IArtworkReward {
  artworkImgUrl: string;
  artworkSeq: number;
  artworkUid: string;
  rewardCode: string;
  rewardImgUrl: string;
}
