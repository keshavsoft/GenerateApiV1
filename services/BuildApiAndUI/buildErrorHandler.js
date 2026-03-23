import * as vscode from 'vscode';

export const showBuildErrors = async (errors) => {
    if (!errors || errors.length === 0) return;

    if (errors.length === 1) {
        vscode.window.showErrorMessage(errors[0]);
        return;
    }

    const action = await vscode.window.showErrorMessage(
        `Build failed (${errors.length} issues)`,
        'View Details'
    );

    if (action === 'View Details') {
        vscode.window.showErrorMessage(errors.join('\n'));
    }
};