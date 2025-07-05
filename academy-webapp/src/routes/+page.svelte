<script>
  import UwcsLogo from "$lib/UWCSLogo.svelte";

  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    if (page.data.session) {
      goto("/dashboard")
    }
  })
</script>

<!-- Landing Page -->

<div
  class="min-h-screen flex flex-col justify-between bg-[url(img/bg-particles.png)]"
>
  <main class="flex flex-1 items-center justify-center flex-col gap-8">
    <img
      src="uwcs_academy.png"
      alt="UWCS Academy"
      class="max-w-lg scale-150 mb-10"
    />
    
    <button
        type="button"
        class="flex items-center justify-center gap-2 w-xs mt-10 text-white
        bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
        rounded-lg text-lg px-6 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
        focus:outline-none dark:focus:ring-blue-800"
        on:click={() => signIn("keycloak").then(() => goto("/"))}
      >
        <span class="flex items-center gap-2">
          Sign in with <UwcsLogo
            colour="white"
            class="inline-block align-middle"
          />
        </span>
      </button>
  </main>
</div>
