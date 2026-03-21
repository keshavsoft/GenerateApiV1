import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

import { createVersionFolder } from "./version/createVersion.js";
import { getSchemaFiles } from "./schema/getSchemaFiles.js";
import { createApiFolders } from "./folders/createApiFolders.js";
import { createRoutesFile } from "./createRouteFile.js";
import { attachVersionToApp } from "./alterApp.js";

function getBasePath() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    return workspace?.uri.fsPath;
};

// small safety fix (avoid crash if folder empty/unreadable)
function isFirstRun(base) {
    const appFilePath = path.join(base, "app.js");

    if (!fs.existsSync(appFilePath)) return true;

    return false;
};

// prevent overwriting user files on first run
function copyTemplateOnce(base, context) {
    const source = path.join(context.extensionPath, 'media', 'template');
    if (!fs.existsSync(source)) return;

    fs.cpSync(source, base, {
        recursive: true,
        errorOnExist: false   // 👈 important
    });
};

// orchestration only
export function buildAPI(context) {
    const base = getBasePath();
    if (!base) return;

    // 🔥 FIRST RUN CHECK
    if (isFirstRun(base)) {
        copyTemplateOnce(base, context);
    };

    const schemaDir = path.join(base, "Config", 'Schemas');

    const jsonFiles = getSchemaFiles({ inSchemaDir: schemaDir });

    if (!jsonFiles.length) return;

    const newVersion = createVersionFolder(base);

    const apiDir = path.join(base, `V${newVersion}`);

    createApiFolders({
        apiDir, jsonFiles, context,
        inSchemaPath: schemaDir,
        inNewVersion: `V${newVersion}`
    });

    createRoutesFile(apiDir, jsonFiles);

    attachVersionToApp(base, apiDir);
};
