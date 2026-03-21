import { createSchemaStart } from '../services/schemaService.js';

export function handleMessage(message, context, panel) {
    if (message.command === 'createSchema') {
        createSchemaStart(context);

        panel.webview.postMessage({
            type: 'schemaCreated'
        });
    }
};