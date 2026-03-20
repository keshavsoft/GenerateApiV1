import * as vscode from "vscode";
import fs from "fs";
import path from "path";

function startFunc(context) {
    const panel1 = vscode.window.createWebviewPanel(
        "voicePanel",
        "Voice To Text",
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    const panel2 = vscode.window.createWebviewPanel(
        "voicePanel",
        "Voice To Text",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            enableCommandUris: true,
            enableForms: true,
            localResourceRoots: [],
            enableFindWidget: true,
            retainContextWhenHidden: true
        }
    );

    const panel = vscode.window.createWebviewPanel(
        "voicePanel",
        "Voice To Text",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            enableForms: true,
            retainContextWhenHidden: true
        }
    );
    
    const htmlPath = path.join(
        context.extensionPath,
        "WebViews",
        "voice.html"
    );

    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    panel.webview.html = htmlContent;
};

export { startFunc };