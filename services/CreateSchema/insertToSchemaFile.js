import fs from "fs";
import { getJsonFiles } from "./pullJsonFiles.js";

export const StartFunc = ({ inToPath }) => {
    const LocalFileNamesAsArray = getJsonFiles();

    const LocalJsonToInsert = {
        Tables: LocalFileNamesAsArray
    };

    fs.writeFileSync(
        `${inToPath}/schema.json`,
        JSON.stringify(LocalJsonToInsert)
    );
};