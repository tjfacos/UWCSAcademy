<script>
    import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<div class="fixed bottom-3 left-3 z-50">
    <button
        aria-label="Sign Out"
        onclick={() => signOut()}
        class="p-3 rounded-full shadow-md border border-gray-200 dark:border-yellow-400 bg-blue-600 dark:bg-yellow-300 flex items-center justify-center transition-all hover:shadow-xl hover:scale-110"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
        >
            <polyline
                points="6 15 3 12 6 9"
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="dark:stroke-black"
            />
            <line
                x1="3"
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
            <path
                d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16"
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="dark:stroke-black"
            />
        </svg>
    </button>
</div>
