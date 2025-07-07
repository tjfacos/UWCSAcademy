import { getAllCourses } from "$lib/db/database.server";

export async function load() {
    const courses = await getAllCourses();
    return { courses };
}