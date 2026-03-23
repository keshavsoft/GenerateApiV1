import * as vscode from 'vscode';

export const runInTerminal = ({ cwd }) => {
    const terminal = vscode.window.createTerminal({
        name: 'App Runner',
        cwd
    });

    terminal.show();

    terminal.sendText('npm i');
    terminal.sendText('npm run start');
};