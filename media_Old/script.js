document.addEventListener('DOMContentLoaded', () => {
    const vscode = acquireVsCodeApi();

    const createBtn = document.getElementById('create');
    const buildBtn = document.getElementById('build');

    vscode.postMessage({ command: 'check' });

    createBtn.onclick = () => {
        console.log("Create clicked");
        vscode.postMessage({ command: 'create' });
    };

    buildBtn.onclick = () => {
        vscode.postMessage({ command: 'build' });
    };

    window.addEventListener('message', event => {
        const msg = event.data;

        if (msg.type === 'state') {
            createBtn.classList.toggle('hidden', msg.exists);
            buildBtn.classList.toggle('hidden', !msg.exists);
        }
    });
});