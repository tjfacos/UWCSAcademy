import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/core/providers/keycloak";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Keycloak({
            clientId:       process.env.AUTH_KEYCLOAK_ID,
            clientSecret:   process.env.AUTH_KEYCLOAK_SECRET,
            issuer:         process.env.AUTH_KEYCLOAK_ISSUER,
        })
    ],
    trustHost: true
})