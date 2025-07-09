<script>
    import SignoutBtn from "$lib/components/signout-btn.svelte";
    import BackBtn from "$lib/components/back-btn.svelte";

    import { page } from "$app/stores";

    let { data } = $props();
</script>

<svelte:head>
    <title>{data.lesson.title} - UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-100 py-10 bg-[url('/bg-particles.png')]">
    <BackBtn back_path="/course/{data.course.id}" />
    <SignoutBtn />

    <h2
        class="font-semibold text-4xl text-gray-700 dark:text-gray-300 w-full mt-10 mb-5"
    >
        {data.course.title}
    </h2>

    <h1 class="font-black text-8xl w-full mb-5 dark:text-white">
        {data.lesson.title}
    </h1>

    <div id="lesson-content"></div>
</div>
