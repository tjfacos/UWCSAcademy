import { getCourse, getLesson } from "$lib/db/database.server";
import { getCourseFiles } from "$lib/assets/files.server.js";

export async function load({ parent, params }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const id        = parseInt(params.id)
    const lesson    = await getLesson(id)

    if (lesson == null || lesson.hidden)
        throw redirect(401, "/dashboard")

    const course = await getCourse(lesson.course)

    let content = {
        "main-body": await getCourseFiles(`${course.directory}/${lesson.directory}/${lesson.markdown}.html`)
    }

    return { lesson, course, content }
    
}