import { getCourse, getLesson } from "$lib/db/database.server";
import { getCourseFiles, styleRawHTML } from "$lib/assets/files.server.js";

// Styling object
const lesson_content_tailwind_style = {
    "h1":   "font-black     text-5xl mt-10 mb-5",
    "h2":   "font-bold      text-4xl mt-8  mb-2",
    "h3":   "font-bold      text-3xl mt-8  mb-2",
    "h4":   "font-bold      text-2xl mt-8  mb-2",
    "h5":   "font-semibold  text-xl  mt-5  mb-1",
    "h6":   "font-semibold  text-lg  mt-5  mb-1",

    "p":    "font-medium text-lg py-2 dark:text-gray-200",

    "ul":   "list-disc dark:text-gray-200 px-10 py-5",
    "ol":   "list-decimal dark:text-gray-200 px-10 py-5",
    "li":   "font-medium text-lg py-2 dark:text-gray-200",

    // "code": "bg-gray-100 rounded px-1 py-0.5 font-mono text-base dark:bg-gray-800 dark:text-gray-100",
    "pre":  "bg-gray-900 text-white rounded p-4 overflow-x-auto font-mono text-base dark:bg-gray-950 dark:text-gray-100"
}


export async function load({ parent, params }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const id        = parseInt(params.id)
    const lesson    = await getLesson(id)

    if (lesson == null || lesson.hidden)
        throw redirect(401, "/dashboard")

    const course = await getCourse(lesson.course)

    console.log("CONTENT FETCH FROM FILE SERVER TEST")

    let main_html = await getCourseFiles(`${course.directory}/${lesson.directory}/${lesson.markdown}.html`)
    
    let content = {
        "main-body": styleRawHTML(main_html, lesson_content_tailwind_style)
    }

    console.log(content["main-body"])

    return { lesson, course, content }
    
}