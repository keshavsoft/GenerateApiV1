import { StartFunc as fetchAsGet } from "./fetchAsGet.js";
import { StartFunc as StartFuncAfterFetch } from "./AfterFetch/EntryFile.js";

let StartFunc = async ({ inRowPk }) => {
    let jVarLocalDataNeeded = await fetchAsGet({ inRowPk });

    StartFuncAfterFetch({ inResponse: jVarLocalDataNeeded });
};

export { StartFunc };
