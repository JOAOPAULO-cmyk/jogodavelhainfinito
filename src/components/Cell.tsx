import { Player } from '../types/game';

interface CellProps {
  player: Player | null;
  isWinning: boolean;
  onClick: () => void;
}

export function Cell({ player, isWinning, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-16 h-16 border-2 border-gray-700
        flex items-center justify-center
        text-3xl font-bold
        transition-all duration-200
        hover:bg-gray-50
        ${isWinning ? 'bg-green-200 animate-pulse' : 'bg-white'}
        ${player === 'X' ? 'text-blue-600' : 'text-red-600'}
      `}
    >
      {player}
    </button>
  );
}
