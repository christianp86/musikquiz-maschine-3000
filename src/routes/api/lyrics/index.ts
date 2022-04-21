import type { RequestHandlerOutput } from '@sveltejs/kit/types/index.js';

const API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY as string
const MUSIXMATCH_URL = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get'

/**
 * Gets artists and tracks based on a string
 * @param params @type {import('@sveltejs/kit').Request} URL parameter
 * @returns @type {import('@sveltejs/kit').EndpointOutput} Spotify Search Result
 */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params } ): Promise<RequestHandlerOutput> {
    const musixmatchUrl = new URL(MUSIXMATCH_URL)
    musixmatchUrl.searchParams.append('format', 'json')
    musixmatchUrl.searchParams.append('q_track', params?.track)
    musixmatchUrl.searchParams.append('q_artist', params?.artist)
    musixmatchUrl.searchParams.append('apikey', API_KEY)

    const response = await fetch(musixmatchUrl.href);

    if (response.ok && response.status === 200) {
        const lyricsResponse = await response.json()
        let lyrics: string = lyricsResponse?.message?.body?.lyrics?.lyrics_body
        lyrics = lyrics.slice(0, lyrics.indexOf('...'))

        return {
            status: 200,
            body: JSON.stringify(lyrics)
        };
    }
}