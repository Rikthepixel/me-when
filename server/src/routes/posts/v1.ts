import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "../../guards/auth";

const postsV1Api = new Hono().basePath("/v1");

// Create a new post for a given category
postsV1Api.post(
  "/",
  zValidator("json", z.object({ category: z.string() })),
  auth,
  (ctx) => {
    return ctx.json({});
  },
);

// Gives the current posts of all your friends
// #personal
// #response Array<{ user: User, image_url: string, theme: { descriptor: string, date: Date } }>
postsV1Api.get("/current", auth, (ctx) => {
  return ctx.json({});
});

// Gives the past posts matching the given day
// #personal
// #response Array<{ user: User, image_url: string, theme: { descriptor: string, date: Date } }>
postsV1Api.get(
  "/:day",
  zValidator(
    "query",
    z.object({
      day: z.coerce.number().positive().int(), // Minus offset from current day
    }),
  ),
  auth,
  (ctx) => {
    return ctx.json({});
  },
);

export default postsV1Api;
