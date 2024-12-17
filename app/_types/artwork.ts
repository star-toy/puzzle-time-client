export interface ArtworkPuzzle {
  imageUrl: string;
  isCompleted: boolean;
  puzzleImageId: number;
  puzzleIndex: number;
  puzzleUid: string;
}

export interface Artwork {
  artwork: {
    artworkDescription: string;
    artworkTitle: string;
    artworkUid: string;
  };
  email: string;
  puzzles: ArtworkPuzzle[];
}
