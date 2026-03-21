import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { buildAPI } from './GenerateApi/entryFile.js';

export function StartFunc(context) {
    buildAPI(context);
    
};