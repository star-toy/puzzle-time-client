declare module 'headbreaker' {
  export class Canvas {
    constructor(
      id: string,
      options: {
        borderFill: number;
        fixed?: boolean;
        height: number;
        image: HTMLImageElement;
        lineSoftness: number;
        maxPiecesCount?: { x: number; y: number };
        painter: painters.Konva;
        pieceSize: number;
        preventOffstageDrag?: boolean;
        proximity: number;
        strokeWidth: number;
        width: number;
      },
    );

    adjustImagesToPuzzleHeight(): void;

    shuffle(factor: number): void;

    autogenerate(options: { horizontalPiecesCount: number; insertsGenerator: unknown; metadata: Array<{ color: string }>; verticalPiecesCount: number }): void;

    draw(): void;

    onValid(callback: () => void): void;
  }

  export const painters: {
    Konva: new () => unknown;
  };

  export const generators: {
    flipflop: unknown;
  };
}
