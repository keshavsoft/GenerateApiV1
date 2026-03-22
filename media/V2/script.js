const vscode = acquireVsCodeApi();

document.getElementById("create").addEventListener("click", () => {
    vscode.postMessage({
        command: 'createSchema'
    });
});

document.getElementById("build").addEventListener("click", () => {
    vscode.postMessage({
        command: 'Build'
    });
});

window.addEventListener('message', (event) => {
    const msg = event.data;
    debugger;
    if (msg.type === 'init') {
        updateUI(msg.hasSchema);
    };

    if (msg.type === 'schemaCreated') {
        updateUI(true);
    }
});

function updateUI(hasSchema) {
    const create = document.getElementById('initialView');
    const build = document.getElementById('afterCreateView');

    // create.style.display = 'block';

    if (hasSchema) {
        create.style.display = "none";

        build.style.display = 'block';
    } else {
        create.style.display = "block";

        build.style.display = 'none';
    }
};