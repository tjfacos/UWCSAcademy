<script>
    let { firstname, lastname, email } = $props();
    let showInfo = $state(false);
</script>

<!-- Position the button in the top-left corner -->
<div class="fixed top-4 left-4 z-50">
    <a href="/settings"><button 
        aria-label="View Profile" 
        class="p-5 rounded-full bg-red-300 shadow-lg
        hover:shadow-xl transition-all duration-300 hover:scale-110 
        border border-gray-200 dark:border-gray-600 font-bold text-lg 
        dark:bg-yellow-300"
    onmouseenter={() => showInfo = true}
    onmouseleave={() => showInfo = false}
    style="position: relative;"
    >
        {#if showInfo}
            <div class="absolute w-max left-full top-1/2 -translate-y-1/2 ml-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg px-6 py-3 z-50 flex flex-col items-start min-w-[180px] border border-gray-200 dark:border-gray-600">
                <span class="font-semibold text-lg dark:text-white">{firstname} {lastname}</span>
                <span class="text-xs text-gray-500 mt-0">{email}</span>
            </div>
        {/if}
        <span>{firstname.charAt(0)}{lastname.charAt(0)}</span>

    </button></a>
</div>