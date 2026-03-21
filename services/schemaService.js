import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { StartFunc as CreateSchema } from './CreateSchema/entryFile.js';

export function createSchemaStart(context) {
    const workspace = vscode.workspace.workspaceFolders?.[0];

    if (!workspace) {
        vscode.window.showErrorMessage('Open a folder first');
        return;
    };

    const targetPath = workspace.uri.fsPath;
    const sourcePath = path.join(context.extensionPath, 'media', 'template');

    // fs.cpSync(sourcePath, targetPath, {
    //     recursive: true
    // });

    CreateSchema({ inToPath: targetPath });

    vscode.window.showInformationMessage('Schema created successfully 🚀');
};