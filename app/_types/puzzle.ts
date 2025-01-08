export interface IPuzzle {
  imageUrl: string;
  isCompleted: boolean;
  puzzleImageId: number;
  puzzleIndex: number;
  puzzlePlayData: string;
  puzzlePlayUid: string;
  puzzleUid: string;
}

export interface IPuzzlePlay {
  completedPuzzlesFraction: string;
  isCompleted: boolean;
  puzzlePlayData: string;
  puzzlePlayUid: string;
  puzzleUid: string;
}
