/* eslint-disable @typescript-eslint/naming-convention */
declare module 'headbreaker' {
  export interface Piece {
    id: string;
    metadata: Record<string, unknown>;
  }

  export interface Shape {
    draw(): void;
    fill(color: string): Shape;
    stroke(color: string): Shape;
  }

  export interface Figure {
    shape: Shape;
  }

  export interface PuzzleOptions {
    borderFill: number;
    fixed?: boolean;
    height: number;
    image?: HTMLImageElement;
    lineSoftness: number;
    maxPiecesCount?: { x: number; y: number };
    painter: unknown;
    pieceSize: number;
    preventOffstageDrag?: boolean;
    proximity: number;
    strokeWidth: number;
    width: number;
  }

  export interface GenerateOptions {
    horizontalPiecesCount: number;
    insertsGenerator?: unknown;
    metadata?: Array<Record<string, unknown>>;
    verticalPiecesCount: number;
  }

  export class Canvas {
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor(id: string, options: PuzzleOptions) {}

    adjustImagesToPuzzleHeight(): void;

    shuffle(factor: number): void;

    autogenerate(options: GenerateOptions): void;

    draw(): void;

    redraw(): void;

    onValid(callback: () => void): void;

    attachSolvedValidator(): void;

    registerKeyboardGestures(): void;

    onConnect(callback: (piece: Piece, figure: Figure, target: Piece, targetFigure: Figure) => void): void;

    onDisconnect(callback: (piece: Piece) => void): void;
  }

  export const painters: {
    Konva: new () => unknown;
  };

  export const generators: {
    flipflop: unknown;
    random: unknown;
    sequence: unknown;
  };
}
