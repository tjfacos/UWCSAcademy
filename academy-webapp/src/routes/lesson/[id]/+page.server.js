import { getCourse, getLesson } from "$lib/db/database.server";
import { getCourseFiles, styleRawHTML } from "$lib/assets/files.server.js";

// Styling object
const lesson_content_tailwind_style = {
    // Headings
    "h1":   "font-black     text-5xl mt-10 mb-5 dark:text-gray-200",
    "h2":   "font-bold      text-4xl mt-8  mb-2 dark:text-gray-200",
    "h3":   "font-bold      text-3xl mt-8  mb-2 dark:text-gray-200",
    "h4":   "font-bold      text-2xl mt-8  mb-2 dark:text-gray-200",
    "h5":   "font-semibold  text-xl  mt-5  mb-1 dark:text-gray-200",
    "h6":   "font-semibold  text-lg  mt-5  mb-1 dark:text-gray-200",

    // Standard Text
    "p":    "font-medium text-lg py-2 dark:text-gray-200",

    // Lists
    "ul":   "list-disc dark:text-gray-200 px-10 py-5",
    "ol":   "list-decimal dark:text-gray-200 px-10 py-5",
    "li":   "font-medium text-lg py-2 dark:text-gray-200",

    // Tables
    "table": "table-auto w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 my-6",
    "thead": "bg-gray-200 dark:bg-gray-700",
    "tr":    "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
    "th":    "px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b",
    "td":    "px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium text-lg",

    // Code blocks
    // "pre":  "bg-gray-300 dark:bg-gray-900 rounded p-4 overflow-x-auto font-mono text-base dark:bg-gray-950 dark:text-gray-100"
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

    // console.log("CONTENT FETCH FROM FILE SERVER TEST")

    let main_html = await getCourseFiles(`${course.directory}/${lesson.directory}/${lesson.markdown}.html`)
    
    let content = {
        "main-body": styleRawHTML(main_html, lesson_content_tailwind_style)
    }

    // console.log(content["main-body"])

    return { lesson, course, content }
    
}