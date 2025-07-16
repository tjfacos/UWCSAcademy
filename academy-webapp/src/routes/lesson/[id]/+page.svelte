<script>
    
    import InteractiveLesson from "./interactive_lesson.svelte";
    import StaticLesson from "./static_lesson.svelte";
    
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    
    let { data } = $props();
    
    import hljs from "highlight.js";
    import "highlight.js/styles/github-dark.css";

    // Apply syntax highlighting
    onMount(() => {
        hljs.highlightAll();
    })

</script>

<svelte:head>
    <title>{data.lesson.title} | UWCS Academy</title>
</svelte:head>

{#if data.lesson.interactive}
    <InteractiveLesson course={data.course} lesson={data.lesson} content={data.content}/>
{:else}
    <StaticLesson course={data.course} lesson={data.lesson} content={data.content}/>
{/if}

