import fs from 'fs';
import path from 'path';

import { getNextVersionFolder } from "./getNextVersion.js";

export function createVersionFolder(base) {
    const versionFolder = getNextVersionFolder(base);
    fs.mkdirSync(versionFolder, { recursive: true });
    return versionFolder;
};