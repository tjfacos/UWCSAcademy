<script>
    import Cookies from "js-cookie";
    import {onMount} from 'svelte';

    /////////////////////

    function toggleDark() {
        darkmode = !darkmode;
        
        Cookies.set("dark-mode", darkmode);
        
        updateDarkMode()
    }
    
    export function updateDarkMode() {    
        if (!darkmode) {
            document.getElementById("contents").classList.remove("dark");
        } else {
            document.getElementById("contents").classList.add("dark");
        }
    }
    
    /////////////////////

    if (Cookies.get("dark-mode") == undefined) {
        Cookies.set("dark-mode", true);
    }
    
    var darkmode = $state(Cookies.get("dark-mode") === "true");
    $inspect(darkmode);

    onMount(updateDarkMode)


</script>

<!-- Position the button in the top-left corner -->
<div class="fixed top-4 right-4 z-50">
    <button 
        aria-label="Toggle Dark Mode" 
        onclick={toggleDark}
        class="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-600"
    >
        {#if darkmode}
            <!-- Sun Icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6 text-yellow-500 fill-yellow-100"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
            </svg>
        {:else}
            <!-- Moon Icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6 text-slate-700 fill-slate-200"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
            </svg>
        {/if}
    </button>
</div>