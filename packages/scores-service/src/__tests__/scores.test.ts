import request from 'supertest';
import app from '../index';
import { resetDatabase } from '../db/database';

describe('POST /scores', () => {
  beforeEach(() => {
    resetDatabase();
  });

  it('should store a valid score and return success true', async () => {
    const response = await request(app)
      .post('/scores')
      .send({
        playerName: 'Alice',
        difficulty: 'easy',
        timeToSolve: 42,
      })
      .expect(200);

    expect(response.body).toEqual({ success: true });
  });

  it('should reject invalid payload', async () => {
    const response = await request(app)
      .post('/scores')
      .send({ playerName: 'Bob', difficulty: 'medium' }) // missing timeToSolve
      .expect(400);

    expect(response.body).toEqual({ success: false });
  });
});
