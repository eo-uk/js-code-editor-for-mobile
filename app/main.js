// Put console output in HTML
const htmlConsole = document.getElementById('console');
console.log = function (message) {
    if (typeof message == 'object') {
        htmlConsole.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
        htmlConsole.innerHTML += message + '<br />';
    }
}

// Put console errors in HTML
window.onerror = function(message){
    document.getElementById('console').innerHTML += '<span class="error">' + message + '</span>' + '<br />';
}

// Run code on execute button click
document.querySelector("#btnExecute").addEventListener("click", () => {
    const code = window.editor.getValue();
    eval(code);
})

// Clear console on clear button click
document.querySelector("#btnClear").addEventListener("click", () => {
    document.querySelector("#console").innerText = '';
})

// Auto close certain characters
// Doesn't work on Android keyboard by design
// Might work on Android with keyup by comparing text before and after
// and getting the text difference.
window.addEventListener("keydown", (event) => {
    const toAutoClose = { // Add as needed
        '"': '"',
        "'": "'",
        '(': ')',
        '[': ']',
        '{': '}'
    }
    const char = event.key.toString();

    if (char in toAutoClose) {
        // Get current cursor position
        const cursor = window.editor.getCursor();
        const cursorRow = cursor.line;
        const cursorCol = cursor.ch;

        // Insert closing char at the right place
        const charToAdd = toAutoClose[char];
        const doc = window.editor.getDoc();
        doc.replaceRange(charToAdd, cursor);

        // Place cursor between the two new chars
        window.editor.setCursor({
            line: cursorRow,
            ch: cursorCol
        });
    };
})

// Init codemirror editor
window.editor = CodeMirror(document.querySelector('#editor'), {
    value: '// Welcome to JS Code Editor\nconsole.log("Hello World!");',
    mode:  "javascript",
    readOnly: false,
    styleActiveLine: true,
    lineNumbers: true,
    theme: 'paraiso-dark' //see theme folder for all
});