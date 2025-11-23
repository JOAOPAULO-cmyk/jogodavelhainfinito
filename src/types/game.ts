export type Player = 'X' | 'O';

export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  player: Player | null;
}

export interface GameState {
  board: Map<string, Player>;
  currentPlayer: Player;
  winner: Player | null;
  moveHistory: Position[];
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export interface WinningLine {
  positions: Position[];
  player: Player;
}
