/**
 * All the methods what spotify api support!
 */
export declare type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
  * All the spotify element types
  */
export declare type SpotifyTypes =
  | "user"
  | "episode"
  | "playlist"
  | "show"
  | "track"
  | "album"
  | "artist";

/**
  * Spotify uri type
  */
export declare type SpotifyURI =
  | `spotify:${SpotifyTypes}:${string}:${SpotifyTypes}:${string}`
  | `spotify:${SpotifyTypes | "search"}:${string}`;

/**
 * Paging options
 */
export interface PagingOptions {
  limit: number;
  offset: number;
  market: string;
  params: Record<string, string>;
}
/**
 * Spotify Api's Paging Object
 */
export interface Paging<T> {
  limit: number;
  offset: number;
  total: number;
  items: T[];
}

/**
 * Spotify api's image object!
 */
export interface Image {
  height: number | null;
  width: number | null;
  url: string;
}

/**
 * Track type
 */
export type Track = {
  album: {
    name: string;
    artist: {
      name: string;
    };
    images: Image[];
  };
  id: string;
  href: string;
  name: string;
  preview_url: string;
};

/**
 * Playlist Track
 */
export interface PlaylistTrackType {
  addedAt: string | null;
  readonly track: Track;
}

/**
 * Playlist Track Object
 */
export interface PlaylistTracks {
  items: PlaylistTrackType[];
}

/**
     * Base Playlist Object. Does not in itself exist in Spotify Web Api,
     * but needs to be made since the tracks types vary in the Full and Simplified versions.
     */
export interface PlaylistBaseObject {
  id: string;
  href: string;
  images: Image[];
  name: string;
  type: "playlist";
}

/**
 * Playlist Object Full
 * [](https://developer.spotify.com/web-api/object-model/)
 */
export interface PlaylistObjectFull extends PlaylistBaseObject {
  description: string;
  tracks: Paging<Track>;
}