import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

export const validateBuildPreChecks = ({ context }) => {
    const errors = [];

    const workspaceFolders =
        context?.workspaceState?.get('workspaceFolders') ||
        vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        return {
            isValid: false,
            errors: ['No workspace folder open']
        };
    }

    const rootPath = workspaceFolders[0].uri.fsPath;

    // ✅ simple checks (unchanged)
    const checks = [
        {
            path: path.join(rootPath, 'Config'),
            label: 'Config folder',
            fix: 'Create a folder named "Config" in project root'
        }
    ];

    checks.forEach(item => {
        if (!fs.existsSync(item.path)) {
            errors.push(`${item.label} → ${item.fix}`);
        }
    });

    // ✅ NEW: smart .env as OBJECT
    const envPath = path.join(rootPath, '.env');
    const templatePath = path.join(rootPath, '.env.local'); // ← corrected

    if (!fs.existsSync(envPath)) {
        if (fs.existsSync(templatePath)) {
            errors.push({
                type: 'ENV_MISSING',
                message: '.env file missing',
                fix: 'Create from .env.local',
                canAutoFix: true,
                templatePath
            });
        } else {
            errors.push({
                type: 'ENV_MISSING',
                message: '.env file missing',
                fix: 'Create manually',
                canAutoFix: false
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        rootPath
    };
};