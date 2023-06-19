import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(req) {
    try {
        let body = await req.request.text();
        let { headers, method } = req.request;
        // @ts-ignore
        headers = [...headers.entries()].reduce((m, v) => { m[v[0]] = v[1]; return m; }, {});
        // @ts-ignore
        ['host', 'content-length'].forEach(n => delete headers[n]);
        let res = await fetch(`https://api.openai.com/${req.params.url}`, {
            headers, method, body
        });
        return new Response(await res.text());
    } catch (ex) {
        return new Response("exception: " + ex);
    }
}