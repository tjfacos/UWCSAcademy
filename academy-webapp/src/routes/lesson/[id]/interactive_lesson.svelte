<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";

    import BackBtn from "$lib/components/back_btn.svelte";

    let { course, lesson, content } = $props();
</script>

<!-- Literally default code to test instalation -->

<!-- <h1>CODEMIRROR</h1>

<CodeMirror bind:value lang={javascript()} /> -->

<div class="min-h-screen">
    <!-- Header (Bounds the back and theme buttons in the UI)-->
    <div
        class="fixed top-0 right-0 w-full bg-gray-300 dark:bg-gray-800 border-b-5 border-yellow-300 dark:border-[#ef4f4e]"
        style="height: calc(var(--spacing, 8px) * 20 + 5px);"
    >
        <BackBtn back_path="/course/{course.id}" />
    </div>
</div>
