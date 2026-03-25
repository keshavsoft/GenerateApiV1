import fs from 'fs';
import path from 'path';
import { createSubRoutesFile } from './subRouteHelper.js';
import { StartFunc as createHttpFiles } from './CreateHttpFiles/entryFile.js';

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const writeParams = ({ target, tableName, columns, DependantTables,
    ForeignkeyTables, inSubRoutes }) => {
    const dir = path.join(target, 'CommonFuncs');
    ensureDir(dir);

    const params = {
        DataPath: "Data", TableName: tableName, Columns: columns || [],
        DependantTables,
        ForeignkeyTables,
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

export const startFunc = ({ name, schema, apiDir, templateDir, inNewVersion }) => {
    const target = path.join(apiDir, name);

    ensureDir(target);

    writeParams({
        target,
        tableName: name,
        columns: schema.columns,
        DependantTables: schema?.DependantTables ?? [],
        ForeignkeyTables: schema?.ForeignkeyTables ?? [],
        inSubRoutes: schema?.NonSecured?.SubRoutes ?? []
    });

    copyTemplates({
        templateDir,
        target,
        allowed: schema.NonSecured.SubRoutes
    });

    createSubRoutesFile(target, schema.NonSecured.SubRoutes);

    createHttpFiles({
        inToPathRoot: target,
        inVersion: inNewVersion
    });
};