import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
const schema = "Config";

export function hasOnlySchemaFolder() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return false;

    const rootPath = workspaceFolders[0].uri.fsPath;

    const items = fs.readdirSync(rootPath, { withFileTypes: true })
        .filter(item => item.isDirectory());

    if (items.length !== 1) return false;

    return items[0].name.includes(schema);
};