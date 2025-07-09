<script>
    import SignoutBtn from "$lib/components/signout-btn.svelte";
    import BackBtn from "$lib/components/back-btn.svelte";

    import InteractiveLesson from "./interactive_lesson.svelte";
    import StaticLesson from "./static_lesson.svelte";

    import { page } from "$app/stores";

    let { data } = $props();
</script>

<svelte:head>
    <title>{data.lesson.title} | UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-100 py-10 bg-[url('/bg-particles.png')]">
    <BackBtn back_path="/course/{data.course.id}" />
    <SignoutBtn />

    {#if data.lesson.interactive}
        <InteractiveLesson/>
    {:else}
        <StaticLesson course={data.course} lesson={data.lesson} content={data.content}/>
    {/if}

</div>
