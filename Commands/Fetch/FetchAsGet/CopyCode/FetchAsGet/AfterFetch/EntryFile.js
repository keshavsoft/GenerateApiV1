import { StartFunc as Status200 } from "./status200.js";

let StartFunc = async ({ inResponse }) => {
    let jVarLocalResponse = await inResponse;

    if (jVarLocalResponse.status === 200) {
        const jVarLocalFromResponseAsJson = await jVarLocalResponse.json();

        Status200({ inResponseAsJson: jVarLocalFromResponseAsJson });
    };
};

export { StartFunc };