import * as vscode from 'vscode';
import { validateBuildPreChecks } from './buildPreChecks.js';
import { showBuildErrors } from './buildErrorHandler.js';
import { buildAPI } from '../GenApiWithVer/V1/index.js';
import { handleEnvMissing } from './envHandler.js';
import { hasOnlySchemaFolder } from './checkSchemaFolderOnly.js';

export const StartFunc = async (context) => {
    const firstRun = hasOnlySchemaFolder();

    if (firstRun) {
        await buildAPI({ context });

        return false;
    };

    const result = validateBuildPreChecks({ context });

    if (!result.isValid) {
        const firstError = result.errors[0];

        // ✅ case: string (old errors like Config)
        if (typeof firstError === 'string') {
            vscode.window.showErrorMessage(firstError);
            return;
        }

        // ✅ case: object (.env)

        if (firstError.type === 'ENV_MISSING') {
            await handleEnvMissing(firstError, result.rootPath);
            return;
        };
    };

    await buildAPI({ rootPath: result.rootPath, context });

    vscode.window.showInformationMessage('Build Completed');
};