<script>
    import BackBtn from "$lib/components/back_btn.svelte";
    import { createEditor } from "$lib/components/editor";
    import { onMount } from "svelte";

    import Split from "split.js";

    let { course, lesson, content } = $props();

    let editor;

    onMount(() => {
        
        Split(["#left-split", "#right-split"], {
            minSize: 500,
        });
        
        Split(["#top-right-split", "#bottom-right-split"], {
            direction: "vertical",
            minSize: 100, // Example: Set a minimum height for each pane
            sizes: [70, 30] // Example: Initial distribution, e.g., 70% for top, 30% for bottom
        });

        // Prevent the main-split-container from growing after the page has been initialised
        // document.getElementById("main-split-container").style.maxHeight = document.getElementById("main-split-container").style.height;
        
        // Hide Scrollbar
        document.body.style.overflow = "hidden";

        editor = createEditor(document.getElementById("editor-container"));
    });
</script>

<div class="min-h-screen">
    <BackBtn back_path="/course/{course.id}" />

    <div class="w-full h-full">
        <div
            id="main-split-container"
            class="w-full h-full split"
        >
            <div id="left-split"></div>
            <div id="right-split" class="min-h-screen max-h-screen bg-[#282c34]">
                <div id="top-right-split" class="overflow-auto">
                    <div id="editor-container" class="h-full min-h-0 min-w-0 overflow-auto"></div>
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
            background-color: #334c80;
            background-repeat: no-repeat;
            background-position: 50%;
        }

        .gutter.gutter-horizontal {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
            cursor: col-resize;
        }

        .gutter.gutter-vertical {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
            cursor: row-resize;
        }

        .cm-editor {
            height: 100%;
            max-height: 100%;
        }
    </style>
</div>
