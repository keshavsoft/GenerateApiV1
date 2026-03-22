import path from 'path';
import { startFunc as processSchema } from './processSchema.js';

export function createApiFolders({ apiDir, schemas, context, inNewVersion }) {
    const templateDir = path.join(context.extensionPath, 'media', 'api-template');

    Object.entries(schemas).forEach(([name, schema]) => {
        processSchema({
            name,
            schema,
            apiDir,
            templateDir,
            inNewVersion
        });
    });
}