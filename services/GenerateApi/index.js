import * as vscode from 'vscode';

import { createVersionFolder } from "./version/createVersion.js";
import { getSchemaFiles } from "./schema/getSchemaFiles.js";
import { createApiFolders } from "./folders/createApiFolders.js";
import { createRoutesFile } from "./createRouteFile.js";

function getBasePath() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    return workspace?.uri.fsPath;
};

// only orchestration
export function buildAPI(context) {
    const base = getBasePath();
    if (!base) return;

    const apiDir = createVersionFolder(base);
    const jsonFiles = getSchemaFiles(base);

    if (!jsonFiles.length) return;

    createApiFolders(apiDir, jsonFiles, context);
    createRoutesFile(apiDir, jsonFiles);
};