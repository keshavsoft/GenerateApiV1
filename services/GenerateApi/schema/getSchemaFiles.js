import fs from 'fs';
import path from 'path';

export function getSchemaFiles(base) {
    const schemaDir = path.join(base, 'Schemas');

    if (!fs.existsSync(schemaDir)) {
        vscode.window.showErrorMessage('Schemas folder not found');
        return [];
    }

    const files = fs.readdirSync(schemaDir);
    return files.filter(f => f.endsWith('.json'));
};
