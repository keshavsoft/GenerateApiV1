import fs from 'fs';
import path from 'path';

export function getSchemaFiles({ inSchemaDir }) {
    if (!fs.existsSync(inSchemaDir)) {
        vscode.window.showErrorMessage('Schemas folder not found');
        return [];
    }

    const files = fs.readdirSync(inSchemaDir);
    return files.filter(f => f.endsWith('.json'));
};
