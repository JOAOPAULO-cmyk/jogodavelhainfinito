import { Position, Player } from '../types/game';

export function positionToKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}

export function keyToPosition(key: string): Position {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
}

export function initializeBoard(): Map<string, Player> {
  const board = new Map<string, Player>();
  return board;
}

export function expandBounds(
  currentBounds: { minX: number; maxX: number; minY: number; maxY: number },
  position: Position
) {
  return {
    minX: Math.min(currentBounds.minX, position.x),
    maxX: Math.max(currentBounds.maxX, position.x),
    minY: Math.min(currentBounds.minY, position.y),
    maxY: Math.max(currentBounds.maxY, position.y),
  };
}

export function getVisibleBounds(
  bounds: { minX: number; maxX: number; minY: number; maxY: number }
) {
  const padding = 1;
  return {
    minX: bounds.minX - padding,
    maxX: bounds.maxX + padding,
    minY: bounds.minY - padding,
    maxY: bounds.maxY + padding,
  };
}
