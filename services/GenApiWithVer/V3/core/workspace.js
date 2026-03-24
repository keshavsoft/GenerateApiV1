import * as vscode from 'vscode';

export function getBasePath() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    return workspace?.uri.fsPath;
};