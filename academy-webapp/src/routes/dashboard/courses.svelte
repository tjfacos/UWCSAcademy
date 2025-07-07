<script>
    import Course from "./course.svelte";
    
    let { courses } = $props();

    console.log(courses);
</script>

<div class="grid grid-cols-3 gap-8">
    {#each courses as course}
        {#if !course.hidden}
            <Course title={course.title} author={course.author} />
        {/if}
    {/each}
</div>
