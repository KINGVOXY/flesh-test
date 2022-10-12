import {
  Handlers
} from "$fresh/server.ts";


export const handler: Handlers = {
  GET(_, ctx) {

    return new Response("", {
      status: 303,
      headers: {
        Location: `/articles/`,
      },
    });
  },
};