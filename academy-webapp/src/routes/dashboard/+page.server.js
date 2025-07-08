import { getAllCourses } from "$lib/db/database.server";

export async function load({ parent }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const courses = await getAllCourses();
    return { courses };

}