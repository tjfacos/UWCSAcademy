import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db_url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}`
const db = drizzle(db_url);