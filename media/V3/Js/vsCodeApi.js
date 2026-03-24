const vscode = acquireVsCodeApi();

export const postCommand = (command) => {
    vscode.postMessage({ command });
};

export const onMessage = (callback) => {
    window.addEventListener("message", (event) => {
        callback(event.data);
    });
};