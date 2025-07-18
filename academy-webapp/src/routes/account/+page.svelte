<script>
    import SignoutBtn from "$lib/components/signout_btn.svelte";
    import BackBtn from "$lib/components/back_btn.svelte";
    import AdminPanel from "./admin_panel.svelte";

    import { page } from "$app/stores";

    let { data } = $props();

    const fullname = $page.data.session.user.name;
    const email = $page.data.session.user.email;

</script>

<svelte:head>
    <title>{fullname} | UWCS Academy</title>
</svelte:head>

<div class="flex-1 px-50 py-10 bg-[url('/bg-particles.png')]">
    <BackBtn back_path="/dashboard" />
    <SignoutBtn />

    <h1 class="font-black text-6xl dark:text-white w-full mb-5">
        {fullname}
    </h1>

    <h2
        class="font-semibold text-3xl text-gray-700 dark:text-gray-300 w-full mb-10"
    >
        {email}
    </h2>

    {#if data._super }
        <AdminPanel data={ data.admin_data }/>
    {/if}
</div>
