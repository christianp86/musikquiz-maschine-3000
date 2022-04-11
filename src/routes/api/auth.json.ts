import type { RequestHandlerOutput } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }): Promise<RequestHandlerOutput> {
    /*, res: Response (read the notes below) */
    // Unlike, Next.js API handlers you don't get the response object in a SvelteKit endpoint. As a result, you cannot invoke the below method to set cookies on the responses.
    // await supaba‚seClient.auth.api.setAuthCookie(req, res);
    // `supabaseClient.auth.api.setAuthCookie(req, res)` is dependent on both the request and the responses
    // `req` used to perform few validations before setting the cookies
    // `res` is used for setting the cookies
    //console.log(request)
    const body = await request.json()

    let {
        refresh_token,
        access_token,
        expires_at
    } = constructCookies(body.session)

    return {
        status: 302,
        body: 'success',
        headers: {
            'set-cookie': [
                refresh_token,
                access_token,
                expires_at
            ],
            location: '/quiz'
        }
    }

    // return {
    //     status: 302,
    //     body: 'success',
    //     headers: {
    //         'set-cookie': [
    //             refresh_token,
    //             access_token,
    //             expires_at
    //         ],
    //         location: '/quiz'
    //     }
    // }
}

const constructCookies = (session) => {
    let cookieOptions = `Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${new Date(session.expires_at * 1000).toUTCString()};`

    return {
        refresh_token: `refresh_token=${session.refresh_token};${cookieOptions}`,
        access_token: `access_token=${session.access_token};${cookieOptions}`,
        expires_at: `expires_at=${session.expires_at};${cookieOptions}`
    }
}