import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

const getWorkspaceFolder = () =>
    vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";

const getFolderName = (currentPath) =>
    path.basename(currentPath);

const getAliasFromRoutes = ({ currentPath, folder }) => {
    const routesFile = path.resolve(currentPath, "..", "routes.js");
    if (!fs.existsSync(routesFile)) return "";

    const match = fs.readFileSync(routesFile, "utf8")
        .split(/\r?\n/)
        .find(line => line.includes(`${folder}"`));

    return match?.split("use(")[1]?.split(`"/`)[0] || "";
};

const buildRoutePath = ({ currentPath, workspacePath, alias }) => {
    const parts = currentPath.split(path.sep);
    if (alias) parts[parts.length - 1] = alias;

    return parts.join("/")
        .replace(workspacePath.replaceAll("\\", "/"), "");
};

export const startFunc = ({ inCurrentPath }) => {
    try {
        const workspacePath = getWorkspaceFolder();
        const folder = getFolderName(inCurrentPath);
        const alias = getAliasFromRoutes({ currentPath: inCurrentPath, folder });

        return buildRoutePath({
            currentPath: inCurrentPath,
            workspacePath,
            alias
        });
    } catch (err) {
        console.error("Route build error:", err.message);
        return "";
    }
};