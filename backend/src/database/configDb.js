import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'agendatelefonica',
  password: process.env.DB_PASSWORD || 'softwareengenieer',
  port: process.env.DB_PORT || 5432,
});

export const testConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export default pool;