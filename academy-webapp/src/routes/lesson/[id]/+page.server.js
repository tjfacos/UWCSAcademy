import { getCourse, getLesson } from "$lib/db/database.server";

export async function load({ parent, params }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const id        = parseInt(params.id)
    const lesson    = await getLesson(id)

    if (lesson == null || lesson.hidden)
        throw redirect(401, "/dashboard")

    const course = await getCourse(lesson.course)

    return { lesson, course }
    
}