import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { dbConfig } from "./db.config";

@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: () => new Pool(dbConfig),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}