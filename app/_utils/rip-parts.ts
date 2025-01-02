import type { IArtworkDetail } from '../_types/artwork';

interface IRipPartResult {
  horizontal: null | IRipPart;
  index: number;
  vertical: null | IRipPart;
}

interface IRipPart {
  imageUrl: string;
  index: number;
  offset: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
  };
  size: {
    height: string;
    width: string;
  };
}

export interface IRipPartSet {
  horizontal: IRipPart;
  index: number;
  vertical: IRipPart;
}

export function getRipParts(parts: IRipPartSet[], artwork: IArtworkDetail): IRipPartResult[] {
  return parts.reduce((acc, curr) => {
    if (!artwork.puzzles[curr.index]) return acc;
    const current = artwork.puzzles[curr.index];
    const horizontal = artwork.puzzles[curr.horizontal.index];
    const vertical = artwork.puzzles[curr.vertical.index];

    // 퍼즐 피스 간 비교해서 다른 경우에만 rip이 표시되므로 XOR 연산을 한다.
    // eslint-disable-next-line no-bitwise
    const needHorizontalRip = +current.isCompleted ^ +horizontal.isCompleted;
    // eslint-disable-next-line no-bitwise
    const needVerticalRip = +current.isCompleted ^ +vertical.isCompleted;

    const ripPart: IRipPartResult = {
      index: curr.index,
      horizontal: needHorizontalRip && current.isCompleted ? curr.horizontal : null,
      vertical: needVerticalRip && current.isCompleted ? curr.vertical : null,
    };

    acc.push(ripPart);

    return acc;
  }, [] as IRipPartResult[]);
}
