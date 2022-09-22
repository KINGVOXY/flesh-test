import { MiddlewareHandlerContext } from "$fresh/server.ts";
export async function handler(request: Request, ctx: MiddlewareHandlerContext) {
  console.log(request.headers.get("host"));
  if (request.headers.get("host") !== Deno.env.get("DOMAIN")) {
    throw new Error("disallow domain!");
  }
  return await ctx.next();
}
