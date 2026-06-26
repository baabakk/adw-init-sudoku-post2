import express, { Request, Response } from 'express';
import scoresRouter from './routes/scores';
import leaderboardRouter from './routes/leaderboard';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(scoresRouter);
app.use(leaderboardRouter);

// Health check endpoint (optional)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Export the app for testing purposes
export default app;

// If this file is executed directly, start the server.
if (require.main === module) {
  const port = process.env.PORT ?? 3000;
  app.listen(port, () => {
    console.log(`Scores service listening on port ${port}`);
  });
}
