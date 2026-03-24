import { postCommand } from "./vscodeApi.js";

export const initEvents = () => {
    document.getElementById("create")
        .addEventListener("click", () => postCommand("createSchema"));

    document.getElementById("build")
        .addEventListener("click", () => postCommand("Build"));

    document.getElementById("buildApiAndUI")
        .addEventListener("click", () => postCommand("buildApiAndUI"));
};