import { Position, Player, WinningLine } from '../types/game';
import { positionToKey } from './boardUtils';

const WIN_LENGTH = 5;

const DIRECTIONS = [
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
];

export function checkWinFromPosition(
  board: Map<string, Player>,
  position: Position,
  player: Player
): WinningLine | null {
  for (const direction of DIRECTIONS) {
    const line = getLineLength(board, position, player, direction);

    if (line.length >= WIN_LENGTH) {
      return {
        positions: line,
        player,
      };
    }
  }

  return null;
}

function getLineLength(
  board: Map<string, Player>,
  startPos: Position,
  player: Player,
  direction: { dx: number; dy: number }
): Position[] {
  const positions: Position[] = [];

  let current = { ...startPos };
  while (true) {
    current = {
      x: current.x - direction.dx,
      y: current.y - direction.dy,
    };

    if (board.get(positionToKey(current)) !== player) {
      break;
    }

    positions.unshift(current);
  }

  positions.push(startPos);

  current = { ...startPos };
  while (true) {
    current = {
      x: current.x + direction.dx,
      y: current.y + direction.dy,
    };

    if (board.get(positionToKey(current)) !== player) {
      break;
    }

    positions.push(current);
  }

  return positions;
}

export function isWinningPosition(pos: Position, winningLine: WinningLine | null): boolean {
  if (!winningLine) return false;

  return winningLine.positions.some(
    (p) => p.x === pos.x && p.y === pos.y
  );
}
