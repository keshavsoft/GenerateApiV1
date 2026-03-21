import fs from 'fs';
import path from 'path';
import { createSubRoutesFile } from './subRouteHelper.js';

const createCommonFolder = ({ inTargetPath, inTableName, inTableColumns }) => {
    const commonDir = path.join(inTargetPath, 'CommonFuncs');

    if (!fs.existsSync(commonDir)) {
        fs.mkdirSync(commonDir, { recursive: true });

        const params = {
            DataPath: "Data",
            TableName: inTableName,
            Columns: inTableColumns
        };

        fs.writeFileSync(
            path.join(commonDir, 'params.json'),
            JSON.stringify(params, null, 2)
        );
    }
};

export function createApiFolders({ apiDir, jsonFiles, context, inSchemaPath }) {
    const templateDir = path.join(context.extensionPath, 'media', 'api-template');
    const allowed = ['Insert', 'Find', 'Read'];

    jsonFiles.forEach(file => {
        const name = path.basename(file, '.json');
        const target = path.join(apiDir, name);
        const tableFileData = fs.readFileSync(path.join(inSchemaPath, file));
        const tableFileDataAsJson = JSON.parse(tableFileData);

        fs.mkdirSync(target, { recursive: true });

        createCommonFolder({
            inTargetPath: target,
            inTableName: name,
            inTableColumns: tableFileDataAsJson.columns
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
