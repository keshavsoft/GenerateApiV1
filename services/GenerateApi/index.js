import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

import { createVersionFolder } from "./version/createVersion.js";
import { getSchemaFiles } from "./schema/getSchemaFiles.js";
import { createApiFolders } from "./folders/createApiFolders.js";
import { createRoutesFile } from "./createRouteFile.js";

function getBasePath() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    return workspace?.uri.fsPath;
};

// small safety fix (avoid crash if folder empty/unreadable)
function isFirstRun(base) {
    if (!fs.existsSync(base)) return true;

    return false;
    // const items = fs.readdirSync(base);

    // return !items.some(name => /^V\d+$/.test(name));
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

    const appFilePath = path.join(base, "app.js");

    // 🔥 FIRST RUN CHECK
    if (isFirstRun(appFilePath)) {
        copyTemplateOnce(base, context);
    };

    const configPath = path.join(base, "Config");
    const jsonFiles = getSchemaFiles(base);
    if (!jsonFiles.length) return;

    const apiDir = createVersionFolder(base);

    createApiFolders(apiDir, jsonFiles, context);
    createRoutesFile(apiDir, jsonFiles);
};