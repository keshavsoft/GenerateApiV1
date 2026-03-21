import fs from 'fs';
import path from 'path';

import { getNextVersionFolder } from "./getNextVersion.js";

export function createVersionFolder(base) {
    const newVersion = getNextVersionFolder(base);

    const versionFolder = path.join(base, `V${newVersion}`);

    fs.mkdirSync(versionFolder, { recursive: true });

    return newVersion;
};