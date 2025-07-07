import { getUser } from "$lib/db/database.server";
import { page } from "$app/stores";

export async function load({ page }) {
    const usr = getUser(page.data.session.user.email)
    const is_super = usr != undefined && usr.is_super

    return { is_super }
}