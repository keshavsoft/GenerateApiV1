import { startFunc as createFolder } from "./createFolder.js";
import { StartFunc as StartFuncFromInsertToSchemaFile } from "./insertToSchemaFile.js";
import { StartFunc as StartFuncFromCopyJsonFiles } from "./copyJsonFiles.js";
import { StartFunc as StartFuncFromForApiFile } from "./ForApiFile/insertToApiFile.js";
import { StartFunc as StartFuncFromForUiFile } from "./ForUiFile/insertToFile.js";

export const StartFunc = async ({ inToPath }) => {
    createFolder({ inToPath });
    
    await StartFuncFromInsertToSchemaFile({ inToPath });
    await StartFuncFromForApiFile({ inToPath });
    await StartFuncFromForUiFile({ inToPath });
    await StartFuncFromCopyJsonFiles({ inToPath });
};