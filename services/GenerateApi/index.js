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

    const jsonFiles = getSchemaFiles(base);

    if (!jsonFiles.length) return;

    const newVersion = createVersionFolder(base);

    const apiDir = path.join(base, `V${newVersion}`);

    createApiFolders(apiDir, jsonFiles, context);
    createRoutesFile(apiDir, jsonFiles);

    attachVersionToApp(base, apiDir);
};

function attachVersionToApp2(base, apiDir) {
    const appPath = path.join(base, 'app.js');
    if (!fs.existsSync(appPath)) return;

    const version = path.basename(apiDir);
    const importLine = `import { router as ${version}Router } from './${version}/route.js';`;
    const useLine = `app.use('/${version}', ${version}Router);`;

    let content = fs.readFileSync(appPath, 'utf-8');

    const marker1 = "import http from 'http';";

    if (!content.includes(importLine) && content.includes(marker1)) {
        // content = content.replace(marker, marker + ';\n' + useLine);
        content = content.replace(
            marker1,
            `${marker1}\n` + importLine
        );
    };

    // if (!content.includes(importLine)) {
    //     content = importLine + '\n' + content;
    // };

    const marker = "app.use(express.static('Public'))";

    if (!content.includes(useLine) && content.includes(marker)) {
        // content = content.replace(marker, marker + ';\n' + useLine);
        content = content.replace(
            marker,
            `${marker}\n` + useLine
        );
    };

    fs.writeFileSync(appPath, content);
};

function attachVersionToApp1(base, apiDir) {
    const appPath = path.join(base, 'app.js');
    if (!fs.existsSync(appPath)) return;

    const version = path.basename(apiDir);
    const importLine = `import { router as ${version}Router
    } from './${version}/route.js'; `;
    const useLine = `app.use('/${version}', ${version}Router); `;

    let content = fs.readFileSync(appPath, 'utf-8');

    if (!content.includes(importLine)) {
        content = importLine + '\n' + content;
    }

    if (!content.includes(useLine)) {
        content += '\n' + useLine;
    }

    fs.writeFileSync(appPath, content);
};