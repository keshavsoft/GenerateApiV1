import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

export function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('ext.openUI', () => {
			const panel = vscode.window.createWebviewPanel(
				'ui',
				'Schema Tool',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					retainContextWhenHidden: true
				}
			);

			const htmlPath = path.join(context.extensionPath, 'media', 'index.html');
			let html = fs.readFileSync(htmlPath, 'utf8');

			// ✅ CSS URI
			const cssUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'media', 'styles.css'))
			);

			// ✅ JS URI
			const jsUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'media', 'script.js'))
			);

			// 🔁 replace paths in HTML
			html = html.replace('styles.css', cssUri);
			html = html.replace('script.js', jsUri);

			panel.webview.html = html;
		})
	);
}

export function deactivate() { }