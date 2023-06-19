import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(req) {
    let body = await req.request.text();
    let { headers, method } = req.request;
    ['host', 'content-length'].forEach(n => headers.delete(n));
    let res = await fetch(`https://api.openai.com/${req.params.url}`, {
        headers, method, body
    });
    return new Response(await res.text());
}