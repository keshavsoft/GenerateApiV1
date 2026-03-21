import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { createRoutesFile } from './createRouteFile.js';

function getNextVersionFolder(basePath) {
    const folders = fs.readdirSync(basePath);

    const versions = folders
        .filter(name => /^V\d+$/.test(name))
        .map(name => parseInt(name.slice(1)));

    const next = versions.length ? Math.max(...versions) + 1 : 1;

    return path.join(basePath, `V${next}`);
};

function createVersionFolder(base) {
    const versionFolder = getNextVersionFolder(base);
    fs.mkdirSync(versionFolder, { recursive: true });
    return versionFolder;
};

function createApiFolders(apiDir, jsonFiles, context) {
	const templateDir = path.join(context.extensionPath, 'media', 'api-template');
	const allowed = ['Insert', 'Find', 'Read'];

	jsonFiles.forEach(file => {
		const name = path.basename(file, '.json');
		const target = path.join(apiDir, name);

		fs.mkdirSync(target, { recursive: true });

		fs.readdirSync(templateDir).forEach(folder => {
			if (!allowed.includes(folder)) return;

			fs.cpSync(
				path.join(templateDir, folder),
				path.join(target, folder),
				{ recursive: true }
			);
		});
	});
};

function getSchemaFiles(base) {
	const schemaDir = path.join(base, 'Schemas');
	const files = fs.readdirSync(schemaDir);
	return files.filter(f => f.endsWith('.json'));
};

export function buildAPI(context) {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const base = workspace.uri.fsPath;

    const apiDir = createVersionFolder(base);
    const jsonFiles = getSchemaFiles(base);

    createApiFolders(apiDir, jsonFiles, context);
    createRoutesFile(apiDir, jsonFiles);
};
