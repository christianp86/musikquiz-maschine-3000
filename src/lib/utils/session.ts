import type {
    Session,
    AuthChangeEvent,
} from '@supabase/gotrue-js/dist/main/lib/types';

/**
 * Sets the server session.
 * @param @type {AuthChangeEvent} event Supabase Auth Event
 * @param @type {Session} session Supabase Auth Session 
 */
export async function setServerSession(event: AuthChangeEvent, session: Session): Promise<void> {
    await fetch('/api/auth.json', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session })
    });
}

export const setAuthCookie = async (session) => await setServerSession('SIGNED_IN', session);
export const unsetAuthCookie = async () => await setServerSession('SIGNED_OUT', null);