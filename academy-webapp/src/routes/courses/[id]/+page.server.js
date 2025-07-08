import { getCourse } from '$lib/db/database.server';

export async function load({ parent, params }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const course = await getCourse(parseInt(params.id))

    if (course.hidden)
        throw redirect(401, "/dashboard")

    return { course }
    
}