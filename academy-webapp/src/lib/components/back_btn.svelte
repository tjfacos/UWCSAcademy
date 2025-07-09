<script>
    let { back_path } = $props();
</script>

<div class="fixed top-4 left-4 z-50">
    <a href={back_path} aria-label="Back">
        <button
            aria-label="Back Button"
            class="p-3 rounded-xl shadow-md border border-gray-200 dark:border-yellow-400 bg-blue-600 dark:bg-yellow-300 flex items-center justify-center transition-all hover:shadow-xl hover:scale-110 space-x-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
            >
                <polyline
                    points="10 15 7 12 10 9"
                    fill="none"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="dark:stroke-black"
                />
                <line
                    x1="7"
                    y1="12"
                    x2="17"
                    y2="12"
                    fill="none"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="dark:stroke-black"
                />
            </svg>
            <span class="text-white dark:text-black font-semibold">Back</span>
        </button>
    </a>
</div>