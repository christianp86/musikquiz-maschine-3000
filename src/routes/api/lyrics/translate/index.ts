import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit/types/index.js';
import * as deepl from 'deepl-node';

const apiKey = import.meta.env.VITE_DEEPL_API_KEY as string

/**
 * Gets artists and tracks based on a string
 * @param params @type {import('@sveltejs/kit').Request} URL parameter
 * @returns @type {import('@sveltejs/kit').EndpointOutput} Spotify Search Result
 */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }): Promise<RequestHandlerOutput> {
    const body = await request.json();
    const targetLanguage = body?.language;
    const lyrics = body?.lyrics;

    console.log(`Translating to ${targetLanguage}`)

    if (targetLanguage === undefined || lyrics === undefined) {
        return {
            status: 400
        }
    }
    const translator = new deepl.Translator(apiKey);
    const result = await translator.translateText(lyrics, null, targetLanguage);

    return result ? {
        status: 201,
        body: JSON.stringify(result.text)
    } : { status: 400 };
}