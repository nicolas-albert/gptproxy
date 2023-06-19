import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(req) {
    try {
        let body = await req.request.text();
        let { headers, method } = req.request;
        ['host', 'content-length'].forEach(n => headers.delete(n));
        let res = await fetch(`https://api.openai.com/${req.params.url}`, {
            headers, method, body
        });
        return new Response(await res.text());
    } catch (ex) {
        return new Response("exception: " + ex);
    }
}