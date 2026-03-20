import { StartFunc as StartFuncFetchFuncs } from "./PostFetch.js";
import { StartFunc as StartFuncAfterFetch } from "./AfterFetch/EntryFile.js";

let StartFunc = async (event) => {
    debugger;
    const jVarLocalCurrentTarget = event.currentTarget;

    let jVarLocalDataNeeded = await StartFuncFetchFuncs({ inCurrentTarget: jVarLocalCurrentTarget });

    StartFuncAfterFetch({ inResponse: jVarLocalDataNeeded });
};

export { StartFunc }