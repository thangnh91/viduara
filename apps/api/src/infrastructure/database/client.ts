import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/config/env";

// Neon serverless HTTP driver — works in both Node.js and edge runtimes
const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql);
export type Database = typeof db;
