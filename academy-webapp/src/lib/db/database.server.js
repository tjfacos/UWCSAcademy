import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { courses_tbl } from '../../db/schema/courses';
import { users_tbl } from '../../db/schema/users';
import { eq, and } from "drizzle-orm"

const db_url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`
const db = drizzle(db_url);

export async function getAllCourses() {
    return await db.select().from(courses_tbl);
}

export async function getUser(email) {
    let user = await db
        .select()
        .from(users_tbl)
        .where(
            eq(users_tbl.email, email)
        )
    return user.at(0)
}