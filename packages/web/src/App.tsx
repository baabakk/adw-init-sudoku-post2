import React, { useState, useCallback } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Board from './components/Board';
import { usePuzzle } from './hooks/usePuzzle';
import { useValidation } from './hooks/useValidation';
import { Difficulty } from '@init-sudoku-post2/contracts';
import './styles/global.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const { board, loading, error, refetch } = usePuzzle(difficulty);
  const { validateMove, validationErrors } = useValidation();

  const handleCellChange = useCallback(
    (row: number, col: number, value: number) => {
      if (!board) return;
      const newBoard = board.map((r) => r.slice());
      newBoard[row][col] = value;
      const isValid = validateMove(newBoard, row, col, value);
      if (!isValid) {
        console.warn('Invalid move', validationErrors);
      }
      // For this phase we do not persist the change; the board is immutable from service.
    },
    [board, validateMove, validationErrors]
  );

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    refetch(newDifficulty);
  };

  return (
    <div className="app-container">
      <h1>Sudoku</h1>
      <DifficultySelector selected={difficulty} onSelect={handleDifficultyChange} />
      {loading && <p>Loading puzzle...</p>}
      {error && <p className="error">Error: {error}</p>}
      {board && <Board board={board} onCellChange={handleCellChange} />}
    </div>
  );
};

export default App;
