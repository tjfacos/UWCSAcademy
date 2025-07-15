<script>
    let { course, lesson, content } = $props()

    import SignoutBtn from "$lib/components/signout_btn.svelte";
    import BackBtn from "$lib/components/back_btn.svelte";

</script>

<div class="min-h-screen px-100 py-10 bg-[url('/bg-particles.png')] bg-blend-lighten">
    <BackBtn back_path="/course/{course.id}" />
    <SignoutBtn />

    <h2
        class="font-semibold text-4xl text-gray-700 dark:text-gray-300 w-full mt-10 mb-5"
    >
        {course.title}
    </h2>
    
    <h1 class="font-black text-8xl w-full mb-5 dark:text-white">
        {lesson.title}
    </h1>
    
    <div class="text-lg font-medium dark:text-white">
        {@html content["main-body"]}
    </div>

</div>
