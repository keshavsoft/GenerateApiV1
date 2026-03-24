import fs from 'fs';
import path from 'path';

function isFirstRun(base) {
    return !fs.existsSync(path.join(base, "app.js"));
}

function copyTemplateOnce(base, context) {
    const source = path.join(context.extensionPath, 'media', 'TemplateVersions', "V2");
    if (!fs.existsSync(source)) return;

    fs.cpSync(source, base, {
        recursive: true,
        errorOnExist: false
    });
}

export async function handleFirstRun(base, context) {
    if (isFirstRun(base)) {
        copyTemplateOnce(base, context);
    }
};