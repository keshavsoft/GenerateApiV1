import fs from 'fs';
import path from 'path';

function createRoutesFile(apiDir, schemas) {
    const imports = [];
    const uses = [];

    Object.keys(schemas).forEach(name => {
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

export { createRoutesFile };
