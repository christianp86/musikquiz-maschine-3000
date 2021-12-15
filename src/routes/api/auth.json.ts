export async function post(req /*, res: Response (read the notes below) */) {
    // Unlike, Next.js API handlers you don't get the response object in a SvelteKit endpoint. As a result, you cannot invoke the below method to set cookies on the responses.
    // await supaba‚seClient.auth.api.setAuthCookie(req, res);
    // `supabaseClient.auth.api.setAuthCookie(req, res)` is dependent on both the request and the responses
    // `req` used to perform few validations before setting the cookies
    // `res` is used for setting the cookies
    return {
        status: 200,
        body: null
    };
}