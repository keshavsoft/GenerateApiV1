import fs from 'fs';
import path from 'path';

function createRoutesFile(apiDir, files) {
    const imports = [];
    const uses = [];

    files.forEach(file => {
        if (!file.endsWith('.json')) return;

        const name = path.basename(file, '.json');

        imports.push(
            `import { router as routerFrom${name} } from "./${name}/routes.js";`
        );

        uses.push(
            `router.use("/${name}", routerFrom${name});`
        );
    });

    const routeFile = `
import express from 'express';

const router = express.Router();

${imports.join('\n')}

${uses.join('\n')}

export { router };
`;

    fs.writeFileSync(path.join(apiDir, 'route.js'), routeFile);
};

export { createRoutesFile }