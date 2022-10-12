import {
  Handlers
} from "$fresh/server.ts";


export const handler: Handlers = {
  GET(_req, ctx) {
    const id = ctx.params.id;

    return new Response("", {
      status: 303,
      headers: {
        Location: `/articles/${id}/status`,
      },
    });
  },
};