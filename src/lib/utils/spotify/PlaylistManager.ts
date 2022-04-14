import type {
  Paging,
  PagingOptions,
  PlaylistTracks,
  PlaylistTrackType,
} from "./Types.js";

export class PlaylistManager {
  private token: string;
  /**
       * 
       * @param token  API Token
       */
  constructor(token: string = "NO TOKEN") {
    this.token = token;
  }

  /**
     * Return all the tracks of the spotify playlist!
     *
     * @param id The id of the playlist
     * @param options Basic PagingOptions
     * @example await client.playlists.getTracks('id');
     */
  async getTracks(
    id: string,
    options: PagingOptions,
  ): Promise<Paging<PlaylistTrackType>> {
    const url: URL = new URL(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
    );

    const { params, ...rest } = options;
    const urlParams = new URLSearchParams(params);

    urlParams.append("limit", rest.limit.toString())

    url.search = urlParams?.toString();
    console.log(`URL: ${url}`);

    const urlString = url.toString();

    const response = await fetch(urlString, {
      headers: {
        "Authorization": `Bearer ${this.token}`,
      },
    });

    const tracks: PlaylistTracks = await response.json();
    //console.log('+++++Tracks', tracks);

    const pagingPlaylistTracks: Paging<PlaylistTrackType> = {
      limit: 0,
      offset: 0,
      total: 0,
      items: tracks.items,
    };

    return pagingPlaylistTracks;
  }
}
