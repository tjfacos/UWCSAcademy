import { getCourse, getLessonsByCourseID } from '$lib/db/database.server';

export async function load({ parent, params }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const id        = parseInt(params.id)
    const course    = await getCourse(id)
    const lessons   = await getLessonsByCourseID(id)

    if (course == null || course.hidden)
        throw redirect(401, "/dashboard")

    return { course, lessons }
    
}