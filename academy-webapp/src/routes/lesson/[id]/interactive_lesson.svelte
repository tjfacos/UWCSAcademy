<script>
    import BackBtn from "$lib/components/back_btn.svelte";
    import { createEditor } from "$lib/components/editor";
    import { onMount } from "svelte";

    import Split from "split.js";

    let { course, lesson, content } = $props();

    let editor;

    onMount(() => {
        Split(["#left-split", "#right-split"], {
            minSize: 500
        });
        Split(["#top-right-split", "#bottom-right-split"], {
            direction: 'vertical'
        })
        editor = createEditor(document.getElementById("editor-container"));
    });

</script>

<div class="flex-1 flex flex-col">
    <BackBtn back_path="/course/{course.id}" />

    <div class="w-full flex-1 flex flex-col">

        <div id="main-split-container" class="w-full flex-1 flex flex-col split">
            <div id="left-split"></div>
            <div id="right-split" class="flex-1 bg-[#282c34]">
                <div id="top-right-split" class="overflow-auto">
                    <div id="editor-container"></div>
                </div>
                <div id="bottom-right-split"></div>
            </div>
        </div>

    </div>

    <style>
        .split {
            display: flex;
            flex-direction: row;
        }

        .gutter {
            background-color: #eee;
            background-repeat: no-repeat;
            background-position: 50%;
        }

        .gutter.gutter-horizontal {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
            cursor: col-resize;
        }
    </style>
</div>
