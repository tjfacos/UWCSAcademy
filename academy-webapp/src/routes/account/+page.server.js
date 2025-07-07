import { getUser } from "$lib/db/database.server";
import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const usr = await getUser(session.user.email)

    return { usr }

}