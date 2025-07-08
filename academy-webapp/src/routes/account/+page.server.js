import { getUser, getSuperUsers } from "$lib/db/database.server";
import { redirect } from "@sveltejs/kit";
import { addSuper, removeSuper } from '$lib/db/database.server.js';


export async function load({ parent }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    const usr = await getUser(session.user.email)
    const _super = usr.is_super

    let admin_data = {}
    if (_super) {
        admin_data = {
            "super_users" : (await getSuperUsers()).map((x) => x["email"])
        }
    }

    console.log("ADMIN DATA")
    console.log(admin_data)

    return { _super, admin_data }

}

export const actions = {
    addSuper: async ({ request }) => {
        const email = (await request.formData()).get("email")
        console.log("ADDING SUPER USER: " + email)
        await addSuper(email)
    },

    removeSuper: async ({ request }) => {
        const email = (await request.formData()).get("email")
        console.log("REMOVING SUPER USER: " + email)
        await removeSuper(email)
    },
};