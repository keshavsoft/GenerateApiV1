import { createSchemaStart } from '../services/schemaService.js';
import { StartFunc as buildApi } from '../services/buildApi.js';

export function handleMessage(message, context, panel) {
    if (message.command === 'createSchema') {
        createSchemaStart(context);

        panel.webview.postMessage({
            type: 'schemaCreated'
        });
    };

    if (message.command === 'Build') {
        buildApi(context);

        panel.webview.postMessage({
            type: 'BuildCompleted'
        });
    }
};