<script>
    import Course from "./course.svelte";
    import Comp from "./comp.svelte";
    import ProfileBtn from "$lib/components/profile_btn.svelte";
    import SignoutBtn from "$lib/components/signout_btn.svelte";

    import { page } from "$app/stores";

    let { data } = $props();

    const fullname = $page.data.session.user.name;
    const firstname = fullname.split(" ")[0];
    const lastname = fullname.substring(firstname.length + 1);
    const email = $page.data.session.user.email;
</script>

<svelte:head>
    <title>Dashboard | UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-50 py-10 bg-[url('/bg-particles.png')]">
    <ProfileBtn {firstname} {lastname} {email} />

    <SignoutBtn />

    <div class="w-full flex flex-col justify-center items-center">
        <img
            src="uwcs_academy.png"
            alt="UWCS Academy"
            class="max-w-lg h-max mb-10"
        />
    </div>

    <h1
        class="font-black text-6xl dark:text-white w-full mt-20 mb-10 pt-5 border-t-10 border-blue-700 dark:border-yellow-300"
    >
        Courses
    </h1>

    <div class="grid grid-cols-3 gap-8">
        {#each data.courses as course}
            {#if !course.hidden}
                <Course id={course.id} title={course.title} author={course.author} />
            {/if}
        {/each}
    </div>

    <h1
        class="font-black text-6xl dark:text-white w-full mt-20 mb-10 pt-5 border-t-10 border-blue-700 dark:border-yellow-300"
    >
        Competitions
    </h1>

    
</div>
