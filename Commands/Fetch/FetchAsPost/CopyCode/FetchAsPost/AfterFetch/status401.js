import ConfigJson from "../../../../../../../../../../Config.json" with {type: 'json'};

let StartFunc = () => {
    const jVarLocalRedirectUrl = ConfigJson.Protected.RedirectUrl;
    const jVarLocalSuccessUrl = window.location.pathname;

    const url = new URL(window.location.href);

    let NewURl = new URL(jVarLocalRedirectUrl, url);

    // NewURl.searchParams.append('SuccessUrl', inSuccessUrl);
    NewURl.searchParams.append('SuccessUrl', jVarLocalSuccessUrl);

    window.location.href = NewURl.href;
};

export { StartFunc };