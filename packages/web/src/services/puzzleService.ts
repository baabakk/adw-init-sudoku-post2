import { Difficulty, PuzzleResponse } from '@init-sudoku-post2/contracts';

/**
 * Fetch a Sudoku puzzle from the Puzzle Service.
 * The service is expected to be reachable at the same origin under /puzzle.
 */
export const fetchPuzzle = async (difficulty: Difficulty): Promise<PuzzleResponse> => {
  const response = await fetch(`/puzzle?difficulty=${difficulty}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch puzzle: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as PuzzleResponse;
  return data;
};
