import fs from 'fs';
import path from 'path';

function insertAfter(content, marker, line) {
    if (!content.includes(marker) || content.includes(line)) return content;
    return content.replace(marker, `${marker}\n${line}`);
};

function insertImport(content, importLine, anchor) {
    if (content.includes(importLine)) return content;
    return content.replace(anchor, `${anchor}\n${importLine}`);
};

function normalize(content) {
    return content.replace(/;;+/g, ';');
};

export function attachVersionToApp(base, apiDir) {
    const appPath = path.join(base, 'app.js');
    if (!fs.existsSync(appPath)) return;

    const version = path.basename(apiDir);
    const importLine = `import { router as ${version}Router } from './${version}/route.js';`;
    const useLine = `app.use('/${version}', ${version}Router);`;

    let content = fs.readFileSync(appPath, 'utf-8');

    content = insertImport(content, importLine, "import http from 'http';");
    content = insertAfter(content, "app.use(express.static('Public'));", useLine);
    content = normalize(content);

    fs.writeFileSync(appPath, content);
};

function attachVersionToApp1(base, apiDir) {
    const appPath = path.join(base, 'app.js');
    if (!fs.existsSync(appPath)) return;

    const version = path.basename(apiDir);
    const importLine = `import { router as ${version}Router } from './${version}/route.js';`;
    const useLine = `app.use('/${version}', ${version}Router);`;

    let content = fs.readFileSync(appPath, 'utf-8');

    const marker1 = "import http from 'http';";

    if (!content.includes(importLine) && content.includes(marker1)) {
        // content = content.replace(marker, marker + ';\n' + useLine);
        content = content.replace(
            marker1,
            `${marker1}\n` + importLine
        );
    };

    // if (!content.includes(importLine)) {
    //     content = importLine + '\n' + content;
    // };

    const marker = "app.use(express.static('Public'))";

    if (!content.includes(useLine) && content.includes(marker)) {
        // content = content.replace(marker, marker + ';\n' + useLine);
        content = content.replace(
            marker,
            `${marker}\n` + useLine
        );
    };

    fs.writeFileSync(appPath, content);
};
