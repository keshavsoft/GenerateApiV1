import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as vscode from "vscode";
import { cpSync } from "fs";

function copyDirectorySync(src, dest) {
    try {
        cpSync(src, dest, { recursive: true });
        console.log(`Directory '${src}' was copied to '${dest}'`);
    } catch (err) {
        console.error('Error copying directory:', err.message);
    }
};

function startFunc(uri) {
    vscode.window.showInformationMessage(uri.fsPath);

    const LocalFromPath = path.join(__dirname, "CopyCode");

    copyDirectorySync(LocalFromPath, uri.fsPath);
};

export { startFunc };