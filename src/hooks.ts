import * as cookie from 'cookie';
import { auth } from '$lib/utils/supabaseClient';
import type { GetSession, Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    let cookies = cookie.parse(event.request.headers.get('cookie') ?? '')
    // Fetch current user from cookie
    const { user, error } = await auth.api.getUser(cookies.access_token);
    if (error)
        console.log(error ?? "No error")

    // Make user data avaivable to svelte components via session
    event.locals.user = (user) ? { id: user.id, aud: user.aud, name: user.user_metadata['full_name'] } : undefined;

    let response = await resolve(event);
    return response;
};

export const getSession: GetSession = (event) => {
    console.log('Get session: ', event.locals.user);
    return event.locals.user
        ? { user: event.locals.user }
        : { user: undefined };
}