export const stepEnsureSetup = async ({ context }) => {

    // ensure config folder exists (copy if missing)

    return {
        stop: false // true if you want to stop flow after setup
    };
};