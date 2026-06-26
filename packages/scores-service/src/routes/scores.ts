import { Router, Request, Response } from 'express';
import { insertScore } from '../services/scoresService';
import { ScoreRequest, ScoreResponse } from '@init-sudoku-post2/contracts';
import { ScoreRecord } from '../types';

const router = Router();

/**
 * POST /scores
 * Records a completed game score.
 */
router.post('/scores', (req: Request, res: Response) => {
  const body = req.body as ScoreRequest;
  // Basic validation – ensure required fields exist and types are correct.
  if (
    typeof body.playerName !== 'string' ||
    typeof body.difficulty !== 'string' ||
    typeof body.timeToSolve !== 'number'
  ) {
    return res.status(400).json({ success: false } as ScoreResponse);
  }

  const record: ScoreRecord = {
    playerName: body.playerName,
    difficulty: body.difficulty as any,
    timeToSolve: body.timeToSolve,
  };

  const success = insertScore(record);
  const response: ScoreResponse = { success };
  res.json(response);
});

export default router;
