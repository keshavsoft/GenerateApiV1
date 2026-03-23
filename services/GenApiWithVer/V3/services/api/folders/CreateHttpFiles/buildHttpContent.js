import fs from 'fs';
import path from 'path';

const getColumns = (currentPath) => {
    const filePath = path.join(currentPath, "..", "CommonFuncs", "params.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return (data?.columns || [])
        .filter(col => col?.isConsider === true)
        .map(col => col.field);
};

const buildBody = (columns) =>
    JSON.stringify(Object.fromEntries(columns.map(c => [c, ""])), null, 4);

export const startFunc = ({ inCurrentPath, method, route, inPortNumber }) => {
    const columns = getColumns(inCurrentPath);
    const url = `${method} http://localhost:${inPortNumber}${route}`;

    if (method === "GET") return url;

    return `${url}
Content-Type: application/json

${buildBody(columns)}`;
};