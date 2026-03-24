import { hasOnlySchemaFolder } from '../checkSchemaFolderOnly.js';
import { buildAPI } from '../../../GenApiWithVer/V3/index.js';

export const stepHandleFirstRun = async ({ context }) => {

    const isFirstRun = hasOnlySchemaFolder();

    if (!isFirstRun) {
        return { stop: false };
    }

    await buildAPI({ context });

    return { stop: true };
};