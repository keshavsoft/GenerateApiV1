import fs from "fs";
import { getJsonFiles } from "./pullApiFiles.js";

const CommonFileName = "ui.json";

export const StartFunc = ({ inToPath }) => {
    const LocalFileNamesAsArray = getJsonFiles();

    const LocalJsonToInsert = {
        Tables: LocalFileNamesAsArray
    };

    fs.writeFileSync(
        `${inToPath}/${CommonFileName}`,
        JSON.stringify(LocalJsonToInsert)
    );
};