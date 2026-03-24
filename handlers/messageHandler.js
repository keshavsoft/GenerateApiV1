import { createSchemaStart } from '../services/schemaService.js';
import { StartFunc as buildApi } from '../services/Build/buildApi.js';
// import { StartFunc as buildApiAndUI } from '../services/BuildApiAndUI/buildApi.js';
import { StartFunc as BuildWithVersions } from '../services/BuildWithVersions/V1/buildApi.js';

export const handleMessage = async (message, context, panel) => {
    if (message.command === 'createSchema') {
        createSchemaStart(context);

        panel.webview.postMessage({
            type: 'schemaCreated'
        });
    };

    if (message.command === 'Build') {
        await buildApi(context);

        panel.webview.postMessage({
            type: 'BuildCompleted'
        });
    }

    if (message.command === 'buildApiAndUI') {
        await BuildWithVersions(context);

        panel.webview.postMessage({
            type: 'BuildCompleted'
        });
    }
};