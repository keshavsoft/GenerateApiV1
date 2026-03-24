import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

export const handleEnvMissing = async (error, rootPath) => {
    if (!error.canAutoFix) {
        vscode.window.showErrorMessage(
            `${error.message} → ${error.fix}`
        );
        return;
    }

    const action = await vscode.window.showErrorMessage(
        error.message,
        'Create .env'
    );

    if (action !== 'Create .env') return;

    if (!fs.existsSync(error.templatePath)) {
        vscode.window.showErrorMessage('Template .env.local not found');
        return;
    }

    const envPath = path.join(rootPath, '.env');

    fs.copyFileSync(error.templatePath, envPath);

    vscode.window.showInformationMessage('.env created successfully');
};