import * as vscode from 'vscode';

import { stepEnsureSetup } from './steps/stepEnsureSetup.js';
import { stepHandleFirstRun } from './steps/stepHandleFirstRun.js';
import { stepHandleNormalRun } from './steps/stepHandleNormalRun.js';

export const StartFunc = async (context) => {

    // STEP 1: Setup → make sure base structure exists
    const setupResult = await stepEnsureSetup({ context });
    if (setupResult.stop) return;

    // STEP 2: First Run → only schema exists
    const firstRunResult = await stepHandleFirstRun({ context });
    if (firstRunResult.stop) return;

    // STEP 3: Normal Run → validations + build
    const normalRunResult = await stepHandleNormalRun({ context });

    if (normalRunResult.showMessage) {
        vscode.window.showInformationMessage('Build Completed');
    }
};