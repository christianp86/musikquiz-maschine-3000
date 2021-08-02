import type { Request, EndpointOutput } from '@sveltejs/kit';
import { AuthManager } from '../../../utils/spotify/AuthManager'
import { SpotifyWebApi } from 'spotify-web-api-ts';

/**
 * Gets artists and tracks based on a string
 * @param params @type {import('@sveltejs/kit').Request} URL parameter
 * @returns @type {import('@sveltejs/kit').EndpointOutput} Spotify Search Result
 */
export async function get({ params } : Request): Promise<EndpointOutput> {
	const authManager = new AuthManager()
	let token = ''

	try {
		token = await authManager.getApiToken(import.meta.env.VITE_SPOTIFY_CLIENT as string, import.meta.env.VITE_SPOTIFY_SECRET as string)
	} catch (error) {
		console.error(error)
		return {
			status: 400,
			body: error
		};
	}
	const spotify = new SpotifyWebApi({ accessToken: token })
	const { artist } = params

	const spotifySearchResult = ( artist !== undefined ) 
		? await spotify.search.search(`"${artist}"`, ['artist'], { market: 'DE' }) 
		: "No artist provided";

	return {
		status: 200,
		body: spotifySearchResult
	};
}
