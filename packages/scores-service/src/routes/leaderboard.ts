import { Router, Request, Response } from 'express';
import { getLeaderboard } from '../services/scoresService';
import { LeaderboardResponse } from '@init-sudoku-post2/contracts';
import { Difficulty } from '@init-sudoku-post2/contracts';

const router = Router();

/**
 * GET /leaderboard?difficulty=easy|medium|hard
 * Returns the top 10 scores for the requested difficulty.
 */
router.get('/leaderboard', (req: Request, res: Response) => {
  const difficultyParam = req.query.difficulty as string;
  if (!difficultyParam) {
    return res.status(400).json({ leaderboard: [] } as LeaderboardResponse);
  }

  // Validate difficulty against the enum values
  const difficultyValues = Object.values(Difficulty) as string[];
  if (!difficultyValues.includes(difficultyParam)) {
    return res.status(400).json({ leaderboard: [] } as LeaderboardResponse);
  }

  const leaderboard = getLeaderboard(difficultyParam as Difficulty);
  const response: LeaderboardResponse = { leaderboard };
  res.json(response);
});

export default router;
