import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getJsonFiles() {
    const LocalFolderPath = path.join(__dirname, "..", "JsonFiles");

    const files = fs.readdirSync(LocalFolderPath);
    const jsonFiles = [];

    files.forEach(file => {
        const filePath = path.join(LocalFolderPath, file);
        const fileStat = fs.statSync(filePath);

        if (
            fileStat.isFile() &&
            path.extname(file) === ".json" &&
            file !== "schema.json" &&
            file !== "UsersTable.json" &&
            file !== "TokenTable.json"
        ) {
            jsonFiles.push(path.parse(file).name);
        }
    });

    return jsonFiles;
}