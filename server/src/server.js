import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import app from './app.js';

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

startServer();