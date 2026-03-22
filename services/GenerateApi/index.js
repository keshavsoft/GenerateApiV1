import { getBasePath } from "./core/workspace.js";
import { handleFirstRun } from "./core/firstRun.js";

import { createVersionFolder } from "./services/version/createVersion.js";
import { loadSchemas } from "./services/schema/loadSchemas.js";
import { createApiFolders } from "./services/api/createApiFolders.js";
import { createRoutesFile } from "./services/api/createRoutesFile.js";
import { attachVersionToApp } from "./services/app/attachVersionToApp.js";
import { createDataFolder } from "./services/data/createDataFolder.js";

export const buildAPI = async ({ context }) => {
    const base = getBasePath();
    if (!base) return;

    await handleFirstRun(base, context);

    const schemas = loadSchemas(`${base}/Config/Schemas`);

    const version = createVersionFolder(base);
    const apiDir = `${base}/V${version}`;

    createApiFolders({ apiDir, schemas, context, inNewVersion: `V${version}` });
    createRoutesFile(apiDir, schemas);
    attachVersionToApp(base, apiDir);

    await createDataFolder({ inBasePath: base, schemas });
};