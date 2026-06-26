import request from 'supertest';
import app from '../index';
import { resetDatabase } from '../db/database';

describe('GET /leaderboard', () => {
  beforeEach(() => {
    resetDatabase();
  });

  it('should return top scores ordered by timeToSolve', async () => {
    // Insert two scores via POST
    await request(app)
      .post('/scores')
      .send({ playerName: 'Alice', difficulty: 'easy', timeToSolve: 50 })
      .expect(200);
    await request(app)
      .post('/scores')
      .send({ playerName: 'Bob', difficulty: 'easy', timeToSolve: 30 })
      .expect(200);

    const response = await request(app)
      .get('/leaderboard')
      .query({ difficulty: 'easy' })
      .expect(200);

    expect(response.body).toEqual({
      leaderboard: [
        { playerName: 'Bob', timeToSolve: 30 },
        { playerName: 'Alice', timeToSolve: 50 },
      ],
    });
  });

  it('should return 400 for missing difficulty', async () => {
    const response = await request(app).get('/leaderboard').expect(400);
    expect(response.body).toEqual({ leaderboard: [] });
  });
});
