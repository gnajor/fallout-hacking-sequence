import { createUserAction } from '../server/actions/createUser.js';
import { postDailyStreakAction } from '../server/actions/postDailyStreak.js';
import type { Actions } from './$types.js';

export const actions: Actions = {
    postDailyStreak: postDailyStreakAction,
    createUser: createUserAction,
}