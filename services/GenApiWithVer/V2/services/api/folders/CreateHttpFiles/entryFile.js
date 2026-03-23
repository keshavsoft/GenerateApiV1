import * as vscode from 'vscode';
import path from 'path';
import { StartFunc as createHttpFile } from './createHttpFile.js';

const getControllerFiles = (version) =>
    vscode.workspace.findFiles(`**/${version}/**/controller.js`);

const processFile = ({ file, root, port, version }) => {
    const currentPath = path.dirname(file.fsPath);

    createHttpFile({ inToPathRoot: root, inCurrentPath: currentPath, inPortNumber: port, inVersion: version });
};

export const StartFunc = async ({ inToPathRoot, inPortNumber = 3000, inVersion = "V1" }) => {
    const files = await getControllerFiles(inVersion);

    files.forEach(file => processFile({ file, root: inToPathRoot, port: inPortNumber, version: inVersion }));
};