import fs from 'fs';
import path from 'path';

const deepFreeze = (obj) => {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (
            obj[prop] !== null &&
            (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
            !Object.isFrozen(obj[prop])
        ) {
            deepFreeze(obj[prop]);
        }
    });
    return obj;
};

export const loadSchemas = (schemaDir) => {
    const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.json'));

    const schemas = {};

    files.forEach(file => {
        const name = path.basename(file, '.json');

        const raw = fs.readFileSync(path.join(schemaDir, file), 'utf-8');
        const parsed = JSON.parse(raw);

        // 🔥 override tableName with file name
        parsed.tableName = name;

        schemas[name] = deepFreeze(parsed);
    });

    return Object.freeze(schemas);
};