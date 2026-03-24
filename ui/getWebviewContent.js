import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

const VERSION = 'v3';

export function getWebviewContent(context, panel) {
    const mediaPath = path.join(context.extensionPath, 'media', VERSION);

    const htmlPath = path.join(mediaPath, 'index.html');

    if (!fs.existsSync(htmlPath)) {
        return `<h1>UI version "${VERSION}" not found</h1>`;
    }

    let html = fs.readFileSync(htmlPath, 'utf8');

    const cssUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(mediaPath, 'styles.css'))
    );

    const jsUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(mediaPath, 'script.js'))
    );

    html = html.replaceAll('{{CSS_URI}}', cssUri.toString());
    html = html.replaceAll('{{JS_URI}}', jsUri.toString());

    return html;
};