import { useState, useCallback, useEffect } from 'react';
import { Difficulty, PuzzleResponse, Board } from '@init-sudoku-post2/contracts';
import { fetchPuzzle } from '../services/puzzleService';

/**
 * Custom hook to fetch a Sudoku puzzle for a given difficulty.
 * Returns the board, loading state, any error message, and a refetch function.
 */
export const usePuzzle = (initialDifficulty: Difficulty) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (difficulty: Difficulty) => {
    setLoading(true);
    setError(null);
    try {
      const response: PuzzleResponse = await fetchPuzzle(difficulty);
      setBoard(response.board);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load puzzle on mount and when initialDifficulty changes
  useEffect(() => {
    load(initialDifficulty);
  }, [initialDifficulty, load]);

  const refetch = useCallback((difficulty: Difficulty) => {
    load(difficulty);
  }, [load]);

  return { board, loading, error, refetch };
};
