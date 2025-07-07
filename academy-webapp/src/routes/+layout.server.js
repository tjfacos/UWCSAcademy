export const load = async (event) => {

    const sess = await event.locals.auth();
    if (!sess.user) throw redirect(303, '/');

    return {
        session: sess
    };

};