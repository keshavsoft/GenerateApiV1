import { buildAPI } from './GenerateApi/index.js';

export function StartFunc(context) {
    buildAPI(context);
};