import fs from 'fs';
import path from 'path';
import { createSubRoutesFile } from './subRouteHelper.js';

export function createApiFolders(apiDir, jsonFiles, context) {
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

        createSubRoutesFile(target, allowed);
    });
};
