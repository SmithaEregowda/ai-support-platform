import "dotenv/config"; // Must be the first import else it won't load env variables
import { connectToDatabase } from "./config/db.js";
import app from "./app.js";

const startserver = async () => {
  const port = process.env.PORT || 8080;

  try {
    await connectToDatabase();
    console.log("Database connected successfully!");
  } catch (err) {
    console.log("Error in Connecting DB", err);
  }

  // Start server regardless of database connection status
  app.listen(port, () => {
    console.log(`Notification Service is up on port ${port}!!`);
  });
};

startserver();
