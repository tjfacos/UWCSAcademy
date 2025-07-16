<script>
    
    import BackBtn from "$lib/components/back_btn.svelte";
    import { createEditor } from "$lib/components/editor";
    import { onMount } from "svelte";
    
    let { course, lesson, content } = $props();
    
    let editor;
    
    onMount(() => {
        editor = createEditor(document.getElementById("editor-container"));
    })

</script>

<div class="min-h-screen">
    <!-- Header (Bounds the back and theme buttons in the UI)-->
    <div
        class="fixed top-0 right-0 w-full bg-gray-300 dark:bg-gray-800 border-b-5 border-yellow-300 dark:border-[#ef4f4e] z-100"
        style="height: calc(var(--spacing, 8px) * 20 + 5px);"
    >
        <BackBtn back_path="/course/{course.id}" />
    </div>

    <div class="w-full h-full">
        
        <!-- Buffer -->
        <div class="w-full h-25"></div>

        <div id="editor-container" class="w-1/2 float-right h-[80vh]"></div>

    </div>
</div>
