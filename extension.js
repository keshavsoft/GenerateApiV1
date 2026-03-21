import * as vscode from 'vscode';
import { getWebviewContent } from './ui/getWebviewContent.js';
import { handleMessage } from './handlers/messageHandler.js';
import { sendInitialState } from './handlers/initHandler.js';

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

			panel.webview.html = getWebviewContent(context, panel);

			panel.webview.onDidReceiveMessage(async (message) => {
				await handleMessage(message, context, panel);
			});

			sendInitialState(panel);
		})
	);
}

export function deactivate() { };