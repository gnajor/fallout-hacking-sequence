import { createUserAction } from '../server/actions/createUser.js';
import type { Actions } from './$types.js';

export const actions: Actions = {
    createUser: createUserAction
}