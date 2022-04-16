
import type { Session } from '@supabase/gotrue-js/dist/main/lib/types';
import type { RequestHandlerOutput } from '@sveltejs/kit'

export type Cookie = {
    refresh_token: string,
    access_token: string,
    provider_token: string,
    expires_at: string
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }): Promise<RequestHandlerOutput> {
    const body = await request.json()

    let {
        refresh_token,
        access_token,
        provider_token,
        expires_at
    } = constructCookies(body.session)

    return {
        status: 200,
        body: 'success',
        headers: {
            'set-cookie': [
                refresh_token,
                access_token,
                provider_token,
                expires_at
            ]
        }
    }
}

const constructCookies = (session): Cookie => {
    // in case user signs out
    if (session === null) {
        session = {
            refresh_token: "deleted",
            access_token: "deleted",
            provider_token: "deleted",
            expires_at: 0,
            token_type: undefined,
            user: undefined
        } 
    }

    let cookieOptions = `Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${new Date(session.expires_at * 1000).toUTCString()};`

    return {
        refresh_token: `refresh_token=${session?.refresh_token};${cookieOptions}`,
        access_token: `access_token=${session?.access_token};${cookieOptions}`,
        provider_token: `provider_token=${session?.provider_token};${cookieOptions}`,
        expires_at: `expires_at=${session?.expires_at};${cookieOptions}`
    }
}