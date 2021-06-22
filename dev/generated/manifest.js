const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/questions.svelte"),
	() => import("../../../src/routes/rounds.svelte"),
	() => import("../../../src/routes/quiz.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/questions.svelte
	[/^\/questions\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/rounds.svelte
	[/^\/rounds\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/quiz.svelte
	[/^\/quiz\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/api/[rounds]/quiz_interfaces.ts
	[/^\/api\/([^/]+?)\/quiz_interfaces\/?$/],

	// src/routes/api/[rounds]/data/questions.json
	[/^\/api\/([^/]+?)\/data\/questions\/?$/],

	// src/routes/api/[rounds]/data/genre.json
	[/^\/api\/([^/]+?)\/data\/genre\/?$/],

	// src/routes/api/[rounds]/[questions].ts
	[/^\/api\/([^/]+?)\/([^/]+?)\/?$/]
];

export const fallback = [c[0](), c[1]()];