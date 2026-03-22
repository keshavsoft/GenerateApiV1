import * as vscode from 'vscode';
import { startFunc as readEnvFile } from "./readEnvFile.js";

export const createDataFolder = async ({ inBasePath, schemas }) => {
    const env = await readEnvFile({ inRootPath: inBasePath });

    const rootUri = getWorkspaceRoot();
    if (!rootUri) return;

    const dataFolderUri = buildDataFolderUri(rootUri, env.DataPath);

    await createFolder(dataFolderUri);
    await createSchemaFiles(dataFolderUri, schemas);
};

// --- helpers (small, focused) ---

const getWorkspaceRoot = () => {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders?.length) {
        vscode.window.showErrorMessage("No workspace folder open");
        return null;
    }

    return folders[0].uri;
};

const buildDataFolderUri = (rootUri, dataPath) => {
    return vscode.Uri.joinPath(rootUri, dataPath);
};

const createFolder = async (folderUri) => {
    await vscode.workspace.fs.createDirectory(folderUri);
};

const createSchemaFiles = async (folderUri, schemas) => {
    for (const name of Object.keys(schemas)) {
        const fileUri = vscode.Uri.joinPath(folderUri, `${name}.json`);

        await vscode.workspace.fs.writeFile(
            fileUri,
            new TextEncoder().encode(JSON.stringify([], null, 2))
        );
    }
};