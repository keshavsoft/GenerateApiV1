import fs from 'fs';
import path from 'path';

import * as vscode from 'vscode';

import { startFunc as readEnvFile } from "./readEnvFile.js";

export const createDataFolder = async ({ inBasePath, inJsonFiles }) => {
    const LocalEnvFileAsJson = await readEnvFile({ inRootPath: inBasePath });
    const workspaceFolders = vscode.workspace.workspaceFolders;

    const folderUri = vscode.Uri.joinPath(
        workspaceFolders[0].uri,
        LocalEnvFileAsJson.DataPath
    );

    // create folder
    await vscode.workspace.fs.createDirectory(folderUri);

    inJsonFiles.forEach(async element => {

        // create file inside it
        const fileUri = vscode.Uri.joinPath(folderUri, element);

        await vscode.workspace.fs.writeFile(
            fileUri,
            new TextEncoder().encode(JSON.stringify({ name: "Keshav" }, null, 2))
        );
    });

};
