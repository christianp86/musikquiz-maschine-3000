import * as cookie from 'cookie';
import { auth } from '$lib/utils/supabaseClient';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    let cookies = cookie.parse(event.request.headers.get('cookie') ?? '')
    // Fetch current user from cookie
    const { user, error } = await auth.api.getUser(cookies.access_token);
    if(error)
        console.log(error ?? "No error")
    // Make user data avaivable to svelte components via session
    event.locals.user = user ?? { guest: true };
    
    let response = await resolve(event);
    return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals
}