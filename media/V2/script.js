const vscode = acquireVsCodeApi();

document.getElementById("create").addEventListener("click", () => {
    vscode.postMessage({
        command: 'createSchema'
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
    const create = document.getElementById('create');
    const build = document.getElementById('build');
    const del = document.getElementById('delete');

    create.style.display = 'block';

    if (hasSchema) {
        build.style.display = 'block';
        del.style.display = 'block';
        create.style.display = "none";
    } else {
        build.style.display = 'none';
        del.style.display = 'none';
    }
};