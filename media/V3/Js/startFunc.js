import { onMessage } from "./vscodeApi.js";
import { updateUI } from "./uiHaldler.js";
import { initEvents } from "./event.js";

const StartFunc = () => {

    initEvents();

    onMessage((msg) => {

        if (msg.type === "init") {
            updateUI(msg.hasSchema);
        }

        if (msg.type === "schemaCreated") {
            updateUI(true);
        }

    });

};

StartFunc();