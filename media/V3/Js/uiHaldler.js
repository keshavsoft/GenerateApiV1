export const updateUI = (hasSchema) => {
    const create = document.getElementById("initialView");
    const build = document.getElementById("afterCreateView");

    if (hasSchema) {
        create.style.display = "none";
        build.style.display = "block";
    } else {
        create.style.display = "block";
        build.style.display = "none";
    }
};