<script>
    import SignoutBtn from "$lib/components/signout-btn.svelte";

    import { page } from "$app/stores";
    import BackBtn from "$lib/components/back-btn.svelte";

    const fullname = $page.data.session.user.name;
    const email = $page.data.session.user.email;
</script>

<svelte:head>
    <title>{fullname} - UWCS Academy</title>
</svelte:head>

<div class="min-h-screen px-50 py-10 bg-[url('/bg-particles.png')]">

    <BackBtn back_path="/dashboard" />
    <SignoutBtn />

    <h1
        class="font-black text-6xl dark:text-white w-full mb-5"
    >
        {fullname}
    </h1>

    <h2 class="font-semibold text-3xl text-gray-700 dark:text-gray-300 w-full mb-10">{email}</h2>
    
</div>
