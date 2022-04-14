import type { cookie as myCookie } from "$routes/api/auth/index.json.js"

import * as cookie from 'cookie';
import { supabase } from "$lib/utils/supabaseClient";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ request }) => {
    let cookies: myCookie = cookie.parse(request.headers.get('cookie') ?? '')
    const session = supabase.auth.session();
    if (!session) {
        console.log("Setting auth")
        supabase.auth.setAuth(cookies.access_token);
    }
    const { data, error } = await supabase.from("musikquiz").select("title");
    
    if (error)
        console.error(error);

    return {
        body: { data }
    };
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ request }) => {
    const { data, error } = await supabase.from("musikquiz").insert({
        user_id: request.locals.user.id,
        title: "This is a test"
    });
    if (error)
        console.error(error);

    return {
        boday: data
    }
};