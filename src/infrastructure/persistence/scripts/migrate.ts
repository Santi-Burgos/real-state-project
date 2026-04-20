import { Client } from "pg";
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { dbConfig } from "../config/db.config";

async function runMigrations() {
  const client = new Client(dbConfig);

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations_log(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const migrationsDir = path.join(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
      .sort();
  let isMigrate = false;
  for(const file of files){
    const {rowCount} = await client.query(`
      SELECT 1 FROM migrations_log
      WHERE name = $1`, [file]);
    
    if(rowCount === 0){
      console.log(`Ejecutando ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file),'utf8');

      await client.query('BEGIN');
      try{
        await client.query(sql);
        await client.query(`
          INSERT INTO migrations_log(name) 
          VALUES ($1)`, [file]);
        await client.query('COMMIT');
        isMigrate = true;
        console.log(`Migraciones levantadas con exito`)
      }catch(err){
        await client.query('ROLLBACK');
        throw err;
      }
    }
  }
  
  if(!isMigrate){
    console.log(`No Hubo migraciones`)
  }
  await client.end();
}

runMigrations();