import type { RequestHandlerOutput } from "@sveltejs/kit"
import type { cookie as myCookie } from "$routes/api/auth/index.json.js"
import { PlaylistManager } from "$lib/utils/spotify/PlaylistManager.js";

import type {
    PagingOptions,
    PlaylistTracks,
    PlaylistTrackType,
} from "$lib/utils/spotify/Types.js";

import * as cookie from 'cookie';
const FIDI_UND_BUMSI_PLAYLIST_ID = "37i9dQZF1DX11WWTNSp4Dq";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (event): Promise<RequestHandlerOutput> => {
    let cookies: myCookie = cookie.parse(event.request.headers.get('cookie') ?? '')
    const token = cookies.provider_token ?? "NO_TOKEN";
    console.log(`Spotify token: ${token}`);

    const playlistManager = new PlaylistManager(token);
    const pagingOptions: PagingOptions = {
        limit: 5,
        offset: 0,
        market: "DE",
        params: {
            "fields": "items(added_at,track(album(artists(name),name),name))",
        },
    };

    const tracks = await playlistManager.getTracks(
        FIDI_UND_BUMSI_PLAYLIST_ID,
        pagingOptions,
    );

    return {
        status: 200,
        body: JSON.stringify(tracks)
    }
}