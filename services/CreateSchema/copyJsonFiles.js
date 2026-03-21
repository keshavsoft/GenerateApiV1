import fse from "fs";
import path from "path";
import { fileURLToPath } from "url";

const CommonFolderName = "Schemas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const StartFunc = ({ inToPath }) => {
    const targetPath = path.join(inToPath, CommonFolderName);

    fse.mkdirSync(targetPath, { recursive: true });

    fse.cpSync(
        path.join(__dirname, "JsonFiles"),
        targetPath,
        { recursive: true }
    );
};