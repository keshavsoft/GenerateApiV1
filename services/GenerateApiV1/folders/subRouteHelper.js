import fs from 'fs';
import path from 'path';

/**
 * Creates routes.js inside a table folder
 * @param {string} tableDir - path to table folder
 * @param {string[]} subFolders - valid sub-route folders (Insert, Find, etc.)
 */
export function createSubRoutesFile(tableDir, subFolders) {
    if (!subFolders || subFolders.length === 0) return;

    const imports = [];
    const uses = [];

    subFolders.forEach(name => {
        imports.push(
            `import { router as ${name}Router } from "./${name}/routes.js";`
        );

        uses.push(
            `router.use("/${name}", ${name}Router);`
        );
    });

    const content = `
import express from 'express';

const router = express.Router();

${imports.join('\n')}

${uses.join('\n')}

export { router };
`;

    const filePath = path.join(tableDir, 'routes.js');

    fs.writeFileSync(filePath, content.trim());
};