import { postBestRunScoreAction } from '../server/actions/postBestRunScore.js';
import type { Actions } from './$types.js';

export const actions: Actions = {
    postBestRunScore: postBestRunScoreAction
}