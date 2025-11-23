import { Position, WinningLine } from '../types/game';
import { positionToKey, getVisibleBounds } from '../utils/boardUtils';
import { isWinningPosition } from '../utils/winDetection';
import { Cell } from './Cell';

interface BoardProps {
  board: Map<string, 'X' | 'O'>;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  winningLine: WinningLine | null;
  onCellClick: (position: Position) => void;
}

export function Board({ board, bounds, winningLine, onCellClick }: BoardProps) {
  const visibleBounds = getVisibleBounds(bounds);

  const rows: JSX.Element[] = [];

  for (let y = visibleBounds.minY; y <= visibleBounds.maxY; y++) {
    const cells: JSX.Element[] = [];

    for (let x = visibleBounds.minX; x <= visibleBounds.maxX; x++) {
      const pos: Position = { x, y };
      const key = positionToKey(pos);
      const player = board.get(key) || null;
      const winning = isWinningPosition(pos, winningLine);

      cells.push(
        <Cell
          key={key}
          player={player}
          isWinning={winning}
          onClick={() => onCellClick(pos)}
        />
      );
    }

    rows.push(
      <div key={`row-${y}`} className="flex">
        {cells}
      </div>
    );
  }

  return (
    <div className="inline-block border-4 border-gray-800 rounded-lg shadow-2xl overflow-hidden">
      {rows}
    </div>
  );
}
