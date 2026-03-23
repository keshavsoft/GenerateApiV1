import fs from 'fs';
import path from 'path';
import { createSubRoutesFile } from './subRouteHelper.js';
import { StartFunc as createHttpFiles } from './CreateHttpFiles/entryFile.js';

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const readSchema = (schemaPath, file) => {
    const raw = fs.readFileSync(path.join(schemaPath, file));
    return JSON.parse(raw);
};

const writeParams = ({ target, tableName, columns, inSubRoutes }) => {
    const dir = path.join(target, 'CommonFuncs');
    ensureDir(dir);

    const params = {
        DataPath: "Data", TableName: tableName, Columns: columns || [],
        NonSecured: {
            SubRoutes: inSubRoutes
        }
    };

    fs.writeFileSync(path.join(dir, 'params.json'), JSON.stringify(params, null, 2));
};

const copyTemplates = ({ templateDir, target, allowed }) => {
    fs.readdirSync(templateDir).forEach(folder => {
        if (!allowed.includes(folder)) return;
        fs.cpSync(path.join(templateDir, folder), path.join(target, folder), { recursive: true, force: true });
    });
};

export const processFile = ({ file, apiDir, schemaPath, templateDir, inNewVersion }) => {
    const name = path.basename(file, '.json');
    const target = path.join(apiDir, name);
    const schema = readSchema(schemaPath, file);

    ensureDir(target);

    writeParams({
        target, tableName: name, columns: schema?.columns,
        inSubRoutes: schema?.NonSecured?.SubRoutes
    });

    copyTemplates({
        templateDir, target,
        allowed: schema?.NonSecured?.SubRoutes
    });

    createSubRoutesFile(target, schema?.NonSecured?.SubRoutes);
    
    createHttpFiles({
        inToPathRoot: target,
        inVersion: inNewVersion
    });
};
