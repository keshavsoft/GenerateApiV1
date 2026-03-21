import fs from 'fs';
import path from 'path';

export function getNextVersionFolder(basePath) {
    const folders = fs.readdirSync(basePath);

    const versions = folders
        .filter(name => /^V\d+$/.test(name))
        .map(name => parseInt(name.slice(1)));

    const next = versions.length ? Math.max(...versions) + 1 : 1;

    return path.join(basePath, `V${next}`);
};