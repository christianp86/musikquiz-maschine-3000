import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify'
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: netlify(),
		vite: {
			resolve: {
				alias: {
					$routes: resolve("./src/routes")
				}
			}
		}
	}
};

export default config;