import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { friendsOnly } from "../../guards/friends-only.js";
import { auth } from "../../guards/auth.js";
import { createMiddleware } from "hono/factory";

const usersV1Api = new Hono().basePath("/v1");

// Get user that you are befriended with
// #auth
// #friend-only
usersV1Api.get(
  "/:user",
  zValidator("query", z.object({ user: z.string() })),
  auth,
  (ctx) => friendsOnly(ctx.var.user, ctx.req.valid("query").user),
  (ctx) => {
    return ctx.json({
      // Insert user here
    });
  },
);

export default usersV1Api;
