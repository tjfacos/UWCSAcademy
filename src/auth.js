import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/core/providers/keycloak";
import { AUTH_KEYCLOAK_ID, AUTH_KEYCLOAK_SECRET, AUTH_KEYCLOAK_ISSUER } from "$env/static/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Keycloak({
            clientId: AUTH_KEYCLOAK_ID,
            clientSecret: AUTH_KEYCLOAK_SECRET,
            issuer: AUTH_KEYCLOAK_ISSUER,
        })
    ]
})