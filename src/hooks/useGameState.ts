import { useState, useCallback } from 'react';
import { GameState, Position, Player, WinningLine } from '../types/game';
import { positionToKey, expandBounds, initializeBoard } from '../utils/boardUtils';
import { checkWinFromPosition } from '../utils/winDetection';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentPlayer: 'X',
    winner: null,
    moveHistory: [],
    bounds: {
      minX: 0,
      maxX: 2,
      minY: 0,
      maxY: 2,
    },
  });

  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);

  const makeMove = useCallback(
    (position: Position) => {
      if (gameState.winner) return false;

      const key = positionToKey(position);
      if (gameState.board.has(key)) return false;

      const newBoard = new Map(gameState.board);
      newBoard.set(key, gameState.currentPlayer);

      const newBounds = expandBounds(gameState.bounds, position);

      const win = checkWinFromPosition(newBoard, position, gameState.currentPlayer);

      setGameState({
        board: newBoard,
        currentPlayer: win ? gameState.currentPlayer : gameState.currentPlayer === 'X' ? 'O' : 'X',
        winner: win ? gameState.currentPlayer : null,
        moveHistory: [...gameState.moveHistory, position],
        bounds: newBounds,
      });

      if (win) {
        setWinningLine(win);
      }

      return true;
    },
    [gameState]
  );

  const resetGame = useCallback(() => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 'X',
      winner: null,
      moveHistory: [],
      bounds: {
        minX: 0,
        maxX: 2,
        minY: 0,
        maxY: 2,
      },
    });
    setWinningLine(null);
  }, []);

  return {
    gameState,
    winningLine,
    makeMove,
    resetGame,
  };
}
