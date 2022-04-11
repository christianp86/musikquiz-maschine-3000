import { supabase } from "$lib/utils/supabaseClient";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    supabase.auth.user.toString()
    const { data, error } = await supabase.from("musikquiz").select("title");
    if (error)
        console.error(error);

    return {
        body: { data }
    };
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
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