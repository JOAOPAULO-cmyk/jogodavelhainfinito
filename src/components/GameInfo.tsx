import { RotateCcw } from 'lucide-react';
import { Player } from '../types/game';

interface GameInfoProps {
  currentPlayer: Player;
  winner: Player | null;
  moveCount: number;
  boardSize: string;
  onReset: () => void;
}

export function GameInfo({ currentPlayer, winner, moveCount, boardSize, onReset }: GameInfoProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Status do Jogo</h2>

        {winner ? (
          <div className="space-y-4">
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-700 text-center">
                Jogador {winner} Venceu!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Vez do Jogador:</span>{' '}
              <span className={`text-2xl font-bold ${currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                {currentPlayer}
              </span>
            </p>
          </div>
        )}

        <div className="mt-4 space-y-2 text-gray-600">
          <p>
            <span className="font-semibold">Jogadas:</span> {moveCount}
          </p>
          <p>
            <span className="font-semibold">Tamanho do Tabuleiro:</span> {boardSize}
          </p>
        </div>

        <button
          onClick={onReset}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Novo Jogo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Regras</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Tabuleiro infinito que expande conforme você joga</li>
          <li>• Vença fazendo 5 símbolos seguidos</li>
          <li>• Horizontal, vertical ou diagonal</li>
          <li>• Não existe empate!</li>
        </ul>
      </div>
    </div>
  );
}
