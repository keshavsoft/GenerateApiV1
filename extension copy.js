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
				{ enableScripts: true, retainContextWhenHidden: true }
			);

			panel.webview.html = getHtml();

			panel.webview.onDidReceiveMessage(msg => {
				const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
				if (!root) return;

				const schemaPath = path.join(root, 'schema');

				if (msg.command === 'check') {
					const exists = fs.existsSync(schemaPath);
					panel.webview.postMessage({ type: 'state', exists });
				}

				if (msg.command === 'create') {
					fs.mkdirSync(schemaPath, { recursive: true });
					panel.webview.postMessage({ type: 'state', exists: true });
				}

				if (msg.command === 'build') {
					vscode.window.showInformationMessage('Build triggered');
				}
			});
		})
	);
}

const getHtml = () => `
<html>
<body>
  <button id="create">Create Schema</button>
  <button id="build" style="display:none;">Build</button>

  <script>
    const vscode = acquireVsCodeApi();

    vscode.postMessage({ command: 'check' });

    document.getElementById('create').onclick = () => {
      vscode.postMessage({ command: 'create' });
    };

    document.getElementById('build').onclick = () => {
      vscode.postMessage({ command: 'build' });
    };

    window.addEventListener('message', event => {
      const msg = event.data;

      if (msg.type === 'state') {
        document.getElementById('create').style.display = msg.exists ? 'none' : 'block';
        document.getElementById('build').style.display = msg.exists ? 'block' : 'none';
      }
    });
  </script>
</body>
</html>
`;

export function deactivate() { }