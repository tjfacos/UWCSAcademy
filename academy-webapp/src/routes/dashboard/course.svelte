<script>
    let { title, author } = $props();
</script>

<div class="w-full rounded-xl p-6 text-white dark:text-black bg-blue-700 dark:bg-yellow-300 mx-auto h-64 hover:shadow-xl transition-all duration-300 hover:scale-105">
    <h2 class="mt-0 mb-4 text-4xl font-bold">{title}</h2>
    <span class="font-medium">By {author}</span>
</div>