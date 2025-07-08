<script>
    let { data } = $props();
    let super_users = $state(data["super_users"]);
</script>

<h2
    class="font-semibold text-3xl text-gray-700 dark:text-gray-300 w-full mb-10"
>
    ADMIN FUNCTIONS
</h2>

<!-- List of Admin Users -->

<div>
    <h3 class="text-xl font-bold mb-2 text-white">Super Users</h3>
    <table
        class="table-auto w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
    >
        <thead class="bg-gray-200 dark:bg-gray-700">
            <tr>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b"
                    >Email</th
                >
            </tr>
        </thead>
        <tbody>
            {#each super_users as usr_email}
                <tr
                    class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <td
                        class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-white font-medium text-lg"
                        >{usr_email}</td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
    <form method="post" class="flex flex-col md:flex-row items-center gap-4 mt-8 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-xl mx-auto">
        <input
            name="email"
            type="email"
            placeholder="Warwick Email Address"
            class="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition font-normal"
        />
        <button
            formaction="?/addSuper"
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition"
        >Add</button>
        <button
            formaction="?/removeSuper"
            type="submit"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition"
        >Remove</button>
    </form>
</div>
