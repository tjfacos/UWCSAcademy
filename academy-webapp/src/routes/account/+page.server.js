import { getUser, getSuperUsers, addSuper, removeSuper } from "$lib/db/database.server";
import { error, redirect } from "@sveltejs/kit";
import axios from "axios";

var usr;

export async function load({ parent }) {

    const { session } = await parent();
    
    if (!session.user)
        throw redirect(308, "/")
    
    usr = await getUser(session.user.email)
    const _super = usr.is_super

    console.log(usr)

    let admin_data = {}
    if (_super) {
        admin_data = {
            "super_users" : (await getSuperUsers()).map((x) => x["email"])
        }
    }

    return { _super, admin_data }

}

export const actions = {
    addSuper: async ({ request }) => {
        if (!usr.is_super) return error(401)

        const email = (await request.formData()).get("email")
        console.log("ADDING SUPER USER: " + email)
        await addSuper(email)
    },

    removeSuper: async ({ request }) => {
        if (!usr.is_super) return error(401)
        
        const email = (await request.formData()).get("email")
        console.log("REMOVING SUPER USER: " + email)
        await removeSuper(email)
    },

    update: async () => {
        if (!usr.is_super) return error(401)

        console.log("UPDATING CONTENT")
        await axios
            .get(`http://update_content:${process.env.CONTENT_SERVICE_PORT}/update`)
            .then(() => {
                console.log("UPDATE REQUEST HANDLED")
            })
    }
};