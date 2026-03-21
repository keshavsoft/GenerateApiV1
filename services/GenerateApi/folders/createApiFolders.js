import fs from 'fs';
import path from 'path';
import { createSubRoutesFile } from './subRouteHelper.js';

const createCommonFolder = ({ inTargetPath, inTableName }) => {
    const commonDir = path.join(inTargetPath, 'CommonFuncs');

    if (!fs.existsSync(commonDir)) {
        fs.mkdirSync(commonDir, { recursive: true });

        const params = {
            DataPath: "data",
            TableName: inTableName
        };

        fs.writeFileSync(
            path.join(commonDir, 'params.json'),
            JSON.stringify(params, null, 2)
        );
    }
};

export function createApiFolders(apiDir, jsonFiles, context) {
    const templateDir = path.join(context.extensionPath, 'media', 'api-template');
    const allowed = ['Insert', 'Find', 'Read'];

    jsonFiles.forEach(file => {
        const name = path.basename(file, '.json');
        const target = path.join(apiDir, name);

        fs.mkdirSync(target, { recursive: true });

        createCommonFolder({
            inTargetPath: target,
            inTableName: name
        });

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
