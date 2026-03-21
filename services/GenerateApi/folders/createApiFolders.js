import path from 'path';
import { processFile } from './processSingleFile.js';

export function createApiFolders({ apiDir, jsonFiles, context, inSchemaPath, inNewVersion }) {
    const templateDir = path.join(context.extensionPath, 'media', 'api-template');

    jsonFiles.forEach(file => processFile({
        file,
        apiDir,
        schemaPath: inSchemaPath,
        templateDir,
        inNewVersion
    }));
}