import { buildAPI } from './GenerateApi/index.js';

export const StartFunc = async (context) => {
    await buildAPI(context);
};