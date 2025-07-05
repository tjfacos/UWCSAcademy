<script>
    import Courses from "./courses.svelte";
    import Comps from "./comps.svelte";
    import ProfileBtn from "$lib/profile-btn.svelte";
    import SignoutBtn from "$lib/signout-btn.svelte";

    import { page } from "$app/stores";

    const fullname  = $page.data.session.user.name;
    const firstname = fullname.split(" ")[0];
    const lastname  = fullname.substring(firstname.length + 1);
    const email     = $page.data.session.user.email;

</script>

<svelte:head>
    <title>Dashboard - UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-50 py-10 bg-[url(img/bg-particles.png)]">
    <ProfileBtn
        firstname={firstname}
        lastname={lastname}
        email={email}
    />

    <SignoutBtn/>

    

    <div class="w-full flex flex-col justify-center items-center">
        <img
            src="uwcs_academy.png"
            alt="UWCS Academy"
            class="max-w-lg h-max mb-10"
        />
    </div>

    <h1
        class="font-black text-6xl dark:text-white w-full mt-20 pt-5 border-t-10 border-blue-700 dark:border-yellow-300"
    >
        Courses
    </h1>

    <Courses />

    <h1
        class="font-black text-6xl dark:text-white w-full mt-20 pt-5 border-t-10 border-blue-700 dark:border-yellow-300"
    >
        Competitions
    </h1>

    <Comps />
</div>
