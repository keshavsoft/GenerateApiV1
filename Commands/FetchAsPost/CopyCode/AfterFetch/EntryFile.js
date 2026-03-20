import { StartFunc as Status200 } from "./status200.js";

// import { StartFunc as Status401 } from "./status401.js";
// import { StartFunc as Status409 } from "./status409.js";
// import { StartFunc as Status404 } from "./status404.js";

let StartFunc = async ({ inResponse }) => {
    let jVarLocalResponse = await inResponse;

    if (jVarLocalResponse.status === 200) {
        let jVarLocalSavedPk = await jVarLocalResponse.text();
        Status200({ inResponse: jVarLocalSavedPk });
    };

    // if (jVarLocalResponse.status === 401) {
    //     let jVarLocalSavedPk = await jVarLocalResponse.text();
    //     Status401({ inResponse: jVarLocalSavedPk });
    // };

    // if (jVarLocalResponse.status === 409) {
    //     let jVarLocalSavedPk = await jVarLocalResponse.text();
    //     Status409({ inResponse: jVarLocalSavedPk });
    // };

    //  if (jVarLocalResponse.status === 404) {
    //     let jVarLocalSavedPk = await jVarLocalResponse.text();
    //     Status404({ inResponse: jVarLocalSavedPk });
    // };
};

export { StartFunc };