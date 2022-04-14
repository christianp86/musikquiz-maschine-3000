import * as cookie from 'cookie';
import { auth } from '$lib/utils/supabaseClient';
import { toExpressRequest, toExpressResponse, toSvelteKitResponse } from '$lib/utils/expresify';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    let cookies = cookie.parse(event.request.headers.get('cookie') ?? '')
    // Fetch current user from cookie
    const { user, error } = await auth.api.getUser(cookies.access_token);
    console.log(error ?? "No error")
    // Make user data avaivable to svelte components via session
    event.locals.user = user ?? { guest: true };

    let response = await resolve(event);

    // if auth request - set cookie in response headers
    if (event.request.method == 'POST' && event.request.path === '/api/auth.json') {
        console.log("Inside special handling")
        try {
            auth.api.setAuthCookie(event, toExpressResponse(response));
        } catch (error) {
            console.error(error)
        }
        response = toSvelteKitResponse(response);
    }

    return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals
    /*     return event.locals.user
            ? {
                user: {
                    // only include properties needed client-side —
                    // exclude anything else attached to the user
                    // like access tokens etc
                    name: event.locals.user.name,
                    email: event.locals.user.email,
                    avatar: event.locals.user.avatar
                }
            }
            : {}; */
}