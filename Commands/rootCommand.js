import fs from 'fs'
import path from 'path'

function startFunc(uri) {
    const LocalPath = path.join(uri.fsPath, "Folder1");
    fs.mkdirSync(LocalPath);
};

export { startFunc };