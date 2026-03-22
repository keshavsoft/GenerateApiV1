import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { startFunc as buildHttpContent } from './buildHttpContent.js';
import { startFunc as buildRoute } from './buildRoute.js';

const detectMethod = (currentPath) => {
    const content = fs.readFileSync(path.join(currentPath, "routes.js"), "utf8");
    if (content.includes("router.get(")) return "GET";
    if (content.includes("router.post(")) return "POST";
    if (content.includes("router.put(")) return "PUT";
    if (content.includes("router.delete(")) return "DELETE";
    return "POST";
};

const getWorkspaceFolder = () =>
    vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";

export const StartFunc = ({ inToPathRoot, inCurrentPath, inPortNumber }) => {
    const method = detectMethod(inCurrentPath);
    const route = buildRoute({ inCurrentPath });

    const content = buildHttpContent({
        method,
        route,
        inPortNumber,
        inCurrentPath,
        inToPathRoot
    });

    fs.writeFileSync(path.join(inCurrentPath, "restNew.http"), content, "utf8");
};