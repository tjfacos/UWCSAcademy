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

export async function getSuperUsers() {
    return await db
        .select({email: users_tbl.email})
        .from(users_tbl)
        .where(eq(users_tbl.is_super, true))
}

export async function addSuper(email) {
    const usr = await getUser(email)
    console.log(usr)
    if (usr != undefined) {
        console.log("User exists")
        await db
            .update(users_tbl)
            .set({is_super: true})
            .where(eq(users_tbl.email, email))
    } else {
        console.log("User does not exist")
        await db
            .insert(users_tbl)
            .values({
                email: email,
                is_super: true
            })
    }
}

export async function removeSuper(email) {
    await db
        .update(users_tbl)
        .set({is_super: false})
        .where(eq(users_tbl.email, email))
}