import { register } from '../../helpers/register.js';

import { startFunc as FetchAsPost } from './FetchAsPost/entryFile.js';
import { startFunc as FetchAsGet } from './FetchAsGet/entryFile.js';

const startFunc = (context, vscode) => {
    register(context, vscode, 'keshavai.FetchAsPost', FetchAsPost);
    register(context, vscode, 'keshavai.FetchAsGet', FetchAsGet);
};

export { startFunc };