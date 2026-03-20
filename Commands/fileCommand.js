import fs from 'fs'
import path from 'path'
import * as vscode from 'vscode'

function startFunc() {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    editor.edit(edit => edit.insert(position, "text"));
};

export { startFunc };
