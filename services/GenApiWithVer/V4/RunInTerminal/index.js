import * as vscode from 'vscode';

export const runInTerminal = ({ cwd }) => {
    const terminal = vscode.window.createTerminal({
        name: 'App Runner',
        cwd
    });

    terminal.show();

    // terminal.sendText(`node ./ForFrontEnd/NonSecured/latestVersion.js`);
    // terminal.sendText(`node ./ForFrontEnd/NonSecured/Builder/main.js`);

    terminal.sendText(`node ./ForFrontEnd/V2/latestVersionToEnv.js`);
    terminal.sendText(`node ./ForFrontEnd/V2/Builder/main.js`);

    terminal.sendText('npm i');
    terminal.sendText('npm run start');
};