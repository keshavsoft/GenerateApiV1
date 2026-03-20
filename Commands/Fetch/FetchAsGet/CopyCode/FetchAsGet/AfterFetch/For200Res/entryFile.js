let StartFunc = ({ inResponseAsJson }) => {
    populateFormFromJson({ inData: inResponseAsJson });
};

const populateFormFromJson = ({ inData }) => {
    Object.entries(inData).forEach(([key, value]) => {
        const el = document.querySelector(`[name="${key}"]`);
        
        if (el) el.value = value;
    });
};

export { StartFunc };
