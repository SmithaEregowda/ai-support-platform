import pg from 'pg';

const { Pool } = pg;
console.log("db password------_>",process.env.DB_PASSWORD, process.env.DB_HOST)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release(); // Release the client back to the pool after use
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};
export default pool;