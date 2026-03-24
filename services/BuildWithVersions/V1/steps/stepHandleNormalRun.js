import * as vscode from 'vscode';

import { validateBuildPreChecks } from '../buildPreChecks.js';
import { handleEnvMissing } from '../envHandler.js';
import { buildAPI } from '../../../GenApiWithVer/V4/index.js';

export const stepHandleNormalRun = async ({ context }) => {

    const result = validateBuildPreChecks({ context });

    if (!result.isValid) {
        const firstError = result.errors[0];

        if (typeof firstError === 'string') {
            vscode.window.showErrorMessage(firstError);
            return { stop: true };
        }

        if (firstError.type === 'ENV_MISSING') {
            await handleEnvMissing(firstError, result.rootPath);
            return { stop: true };
        }

        return { stop: true };
    }

    await buildAPI({ rootPath: result.rootPath, context });

    return {
        stop: false,
        showMessage: true
    };
};