import fs from "fs";

export const startFunc = ({ inToPath }) => {
    fs.mkdirSync(inToPath);
};