import fs from "fs";
import { getJsonFiles } from "./pullApiFiles.js";

export const StartFunc = ({ inToPath }) => {
    const LocalFileNamesAsArray = getJsonFiles();

    const LocalJsonToInsert = {
        Tables: LocalFileNamesAsArray
    };

    fs.writeFileSync(
        `${inToPath}/api.json`,
        JSON.stringify(LocalJsonToInsert)
    );
};