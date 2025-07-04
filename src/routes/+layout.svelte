<script lang="ts">
    import UwcsLogo from "$lib/UWCSLogo.svelte";
    import LightDarkBtn from "$lib/light-dark-btn.svelte";

    let { children } = $props();

    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    onMount(() => {
        if (page.data.session == null && page.url.pathname != "/") {
            goto("/")
        }
    })
</script>

<head>
    <title>UWCS Academy</title>
</head>

<div id="contents" class="dark montserrat-normal dark:bg-gray-900">
    <LightDarkBtn />
    {@render children()}
</div>

<footer
    class="w-full bg-gray-900 text-gray-200 py-6 mt-0 border-t-5 border-t-yellow-300"
>
    <div
        class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between"
    >
        <a href="https://uwcs.co.uk/"><UwcsLogo colour="white"/></a>
        <div class="mb-4 md:mb-0">
            <span class="font-semibold text-lg">UWCS Academy</span>
            <span class="ml-2 text-sm text-gray-400"
                >&copy; {new Date().getFullYear()} All rights reserved.</span
            >
        </div>
    </div>
</footer>
