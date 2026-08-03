import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import app from './app.js';

const startserver = async () => {
  const port = process.env.PORT || 8083;

  try {
    await connectToDatabase();
    console.log('Database connected successfully!');
  } catch (err) {
    console.log('Error in Connecting DB', err);
  }

  app.listen(port, () => {
    console.log(`Chat Service is up on port ${port}!!`);
  });
};

startserver();
