import { PoolConfig } from 'pg';
import 'dotenv/config';

// console.log( process.env.DB_HOST,
//   Number(process.env.DB_PORT),
//    process.env.DB_USER,
//    String(process.env.DB_PASS),
//    process.env.DB_NAME)
export const dbConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
