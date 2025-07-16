<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";

    let value = "";
</script>

<!-- Literally default code to test instalation -->

<h1>CODEMIRROR</h1>

<CodeMirror bind:value lang={javascript()} />