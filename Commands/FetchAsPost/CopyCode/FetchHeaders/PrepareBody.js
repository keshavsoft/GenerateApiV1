const StartFunc = ({ inCurrentTarget }) => {
    const jVarLocalCurrentTarget = inCurrentTarget;
    debugger
    const jVarLocalClosestForm = jVarLocalCurrentTarget.closest("form");

    const jVarLocalInputs = jVarLocalClosestForm.querySelectorAll("input,textarea,select");

    let jVarLocalPostObject = jFLocalPreparePostBody({ inQuerySelectorAll: jVarLocalInputs });

    return jVarLocalPostObject
};

const jFLocalPreparePostBody = ({ inQuerySelectorAll }) => {
    let jVarLocalReturnObject = {};

    inQuerySelectorAll.forEach(LoopItem => {
        if (LoopItem.type === "number") {
            jVarLocalReturnObject[LoopItem.name] = parseFloat(LoopItem.value, 2);
        } else {
            jVarLocalReturnObject[LoopItem.name] = LoopItem.value;
        }

    });

    return JSON.stringify(jVarLocalReturnObject);
};

export { StartFunc }