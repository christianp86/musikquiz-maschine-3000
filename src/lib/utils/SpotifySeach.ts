import type { Paging, Artist } from 'spotify-web-api-ts/types/types/SpotifyObjects'

export default async function getSearchResult(filterText: string) {
    const uri = `/api/${filterText}`;

    return new Promise((resolve, reject) => {
        const response = await fetch(uri);

        if (response.ok) {
            const searchResult: Paging<Artist> = await response.json()
            resolve(searchResult.items.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
            }))
        } else {
            reject()
        }
    })
}