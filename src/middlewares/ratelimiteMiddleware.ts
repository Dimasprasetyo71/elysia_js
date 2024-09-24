import { rateLimit } from "elysia-rate-limit";
import { Elysia } from "elysia";

export const ratelimiteMiddleware = (app: Elysia) => {
    return app
        .use(
            rateLimit({
                errorResponse: new Response("rate-limited", {
                    status: 429,
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                        'Custom-Header': 'custom',
                    }),
                }),
                generator: (key) => `${key}: 10 per 1 sec`,
                duration: 1000,
                max: 10,
            })
        )
}