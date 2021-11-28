/**
 * deno 1.15.3 (release, x86_64-pc-windows-msvc)
 * v8 9.5.172.19
 * typescript 4.4.2
 */
/**
 * https://github.com/oakserver/oak
 */
import { Application } from "https://deno.land/x/oak@v10.0.0/mod.ts";

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
