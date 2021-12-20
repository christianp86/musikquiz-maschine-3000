import { auth } from '$lib/utils/supabaseClient';
import { toExpressRequest, toExpressResponse, toSvelteKitResponse } from '$lib/utils/expresify';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ request, resolve }) => {
    // Converts request to have `req.headers.cookie` on `req.cookies, as `getUserByCookie` expects parsed cookies on `req.cookies`
    const expressStyleRequest = toExpressRequest(request);
    const { user } = await auth.api.getUserByCookie(expressStyleRequest);

    request.locals.user = user || { guest: true };

    let response = await resolve(request);

    // if auth request - set cookie in response headers
    if (request.method == 'POST' && request.path === '/api/auth.json') {
        auth.api.setAuthCookie(request, toExpressResponse(response));
        response = toSvelteKitResponse(response);
    }

    return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request) {
    const { user } = request.locals;
    return {
        user
    };
}