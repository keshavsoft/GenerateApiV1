import * as vscode from 'vscode';

export const startFunc = async ({ inRootPath }) => {
    try {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        const uri = vscode.Uri.joinPath(workspaceFolders[0].uri, '.env');

        const fileData = await vscode.workspace.fs.readFile(uri);

        const content = Buffer.from(fileData).toString('utf-8');
        const envAsObject = parseEnvToObject(content);

        return envAsObject;
        console.log(content);
    } catch (err) {
        console.error('Error reading .env file:', err);
        return null;
    }
};

const parseEnvToObject = (envContent) => {
    const result = {};

    const lines = envContent.split('\n');

    for (let line of lines) {
        line = line.trim();

        if (!line || line.startsWith('#')) continue;

        const equalIndex = line.indexOf('=');
        if (equalIndex === -1) continue;

        const key = line.substring(0, equalIndex).trim();
        let value = line.substring(equalIndex + 1).trim();

        // remove inline comments
        value = value.split(' #')[0].trim();

        // remove quotes
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        // type conversion
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value)) value = Number(value);

        result[key] = value;
    }

    return result;
};