// State
import { EditorState } from "@codemirror/state"

// View
import {
    EditorView, keymap, highlightSpecialChars, drawSelection,
    highlightActiveLine, dropCursor, rectangularSelection,
    crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"

// Language
import {
    defaultHighlightStyle, syntaxHighlighting, indentOnInput,
    bracketMatching, foldGutter, foldKeymap
} from "@codemirror/language"

// Commands / Key inputs
import {
    defaultKeymap, history, historyKeymap
} from "@codemirror/commands"

// Search
import {
    searchKeymap, highlightSelectionMatches
} from "@codemirror/search"

// autocomplete
import {
    autocompletion, completionKeymap, closeBrackets,
    closeBracketsKeymap
} from "@codemirror/autocomplete"

// Lint
import { lintKeymap } from "@codemirror/lint"

// Theme
import {dracula} from 'thememirror';

// Language-Specific
import { javascript } from "@codemirror/lang-javascript"

const view_config = [
    dracula,
    // TODO: How we choose a language
    javascript(),
    // A line number gutter
    lineNumbers(),
    // A gutter with code folding markers
    foldGutter(),
    // Replace non-printable characters with placeholders
    highlightSpecialChars(),
    // The undo history
    history(),
    // Replace native cursor/selection with our own
    drawSelection(),
    // Show a drop cursor when dragging over the editor
    dropCursor(),
    // Allow multiple cursors/selections
    EditorState.allowMultipleSelections.of(true),
    // Re-indent lines when typing specific input
    indentOnInput(),
    // Highlight syntax with a default style
    // syntaxHighlighting(defaultHighlightStyle),
    // Highlight matching brackets near cursor
    bracketMatching(),
    // Automatically close brackets
    closeBrackets(),
    // Load the autocompletion system
    autocompletion(),
    // Allow alt-drag to select rectangular regions
    rectangularSelection(),
    // Change the cursor to a crosshair when holding alt
    crosshairCursor(),
    // Style the current line specially
    highlightActiveLine(),
    // Style the gutter for current line specially
    highlightActiveLineGutter(),
    // Highlight text that matches the selected text
    highlightSelectionMatches(),
    keymap.of([
        // Closed-brackets aware backspace
        ...closeBracketsKeymap,
        // A large set of basic bindings
        ...defaultKeymap,
        // Search-related keys
        ...searchKeymap,
        // Redo/undo keys
        ...historyKeymap,
        // Code folding bindings
        ...foldKeymap,
        // Autocompletion keys
        ...completionKeymap,
        // Keys related to the linter system
        ...lintKeymap
    ])
]


export function createEditor(parent, initial_content = "// Placeholder") {
    const editor = new EditorView({
        doc: initial_content,
        parent: parent,
        extensions: view_config,
        style: "height: 100%; width: 100%; min-height: 0; min-width: 0;"
    })
}