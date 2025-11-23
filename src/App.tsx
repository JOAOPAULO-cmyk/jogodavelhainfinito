import { useGameState } from './hooks/useGameState';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';

function App() {
  const { gameState, winningLine, makeMove, resetGame } = useGameState();

  const boardWidth = gameState.bounds.maxX - gameState.bounds.minX + 1;
  const boardHeight = gameState.bounds.maxY - gameState.bounds.minY + 1;
  const boardSize = `${boardWidth}×${boardHeight}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          Jogo da Velha Infinito
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-shrink-0 overflow-auto max-w-full">
            <Board
              board={gameState.board}
              bounds={gameState.bounds}
              winningLine={winningLine}
              onCellClick={makeMove}
            />
          </div>

          <div className="w-full lg:w-80">
            <GameInfo
              currentPlayer={gameState.currentPlayer}
              winner={gameState.winner}
              moveCount={gameState.moveHistory.length}
              boardSize={boardSize}
              onReset={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
