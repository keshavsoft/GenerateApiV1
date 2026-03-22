import path from 'path';
import { loadSchemas as original } from '../../prepareSchema.js';

export const loadSchemas = (schemaDir) => {
    return original(schemaDir);
};