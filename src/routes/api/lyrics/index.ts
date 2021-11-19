import type { Request, EndpointOutput } from '@sveltejs/kit';

const API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY as string
const MUSIXMATCH_URL = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get'

/**
 * Gets artists and tracks based on a string
 * @param params @type {import('@sveltejs/kit').Request} URL parameter
 * @returns @type {import('@sveltejs/kit').EndpointOutput} Spotify Search Result
 */
export async function get({ query }: Request): Promise<EndpointOutput> {
    const musixmatchUrl = new URL(MUSIXMATCH_URL)
    musixmatchUrl.searchParams.append('format', 'json')
    musixmatchUrl.searchParams.append('q_track', query.get('track'))
    musixmatchUrl.searchParams.append('q_artist', query.get('artist'))
    musixmatchUrl.searchParams.append('apikey', API_KEY)

    const response = await fetch(musixmatchUrl.href);

    if (response.ok) {
        const lyricsResponse = await response.json()
        let lyrics: string = lyricsResponse?.message?.body?.lyrics?.lyrics_body
        lyrics = lyrics.slice(0, lyrics.indexOf('...'))
        const lyrics_result = {
            text: lyrics
        }

        return {
            status: 200,
            body: lyrics_result
        };
    }
}