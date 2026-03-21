import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

export function sendInitialState(panel) {
    const workspace = vscode.workspace.workspaceFolders?.[0];

    const hasSchema = workspace
        ? fs.existsSync(path.join(workspace.uri.fsPath, 'generated-schema'))
        : false;

    setTimeout(() => {
        panel.webview.postMessage({ type: 'init', hasSchema });
    }, 100);
};