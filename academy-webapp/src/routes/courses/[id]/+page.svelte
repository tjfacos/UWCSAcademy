<script>
    import SignoutBtn from "$lib/components/signout-btn.svelte";
    import BackBtn from "$lib/components/back-btn.svelte";

    import { page } from "$app/stores";

    let { data } = $props();
</script>

<svelte:head>
    <title>{data.course.title} - UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-100 py-10 bg-[url('/bg-particles.png')]">
    <BackBtn back_path="/dashboard" />
    <SignoutBtn />

    <div class="w-full mt-10 mb-10">
        <h2
            class="font-semibold text-4xl text-gray-700 dark:text-gray-300 w-full mt-10 mb-5"
        >
            Course
        </h2>

        <div
            class="w-full rounded-xl p-6 text-white dark:text-black bg-blue-700 dark:bg-yellow-300 mx-auto h-64"
        >
            <h1 class="font-black text-8xl w-full mb-5">
                {data.course.title}
            </h1>
            <h3 class="font-semibold mb-5 text-2xl">By {data.course.author}</h3>
            <p class="font-medium w-full">
                {data.course.description}
            </p>
        </div>
    </div>
</div>
