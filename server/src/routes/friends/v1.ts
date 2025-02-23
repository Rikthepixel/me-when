import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "../../guards/auth";

const friendsV1Api = new Hono().basePath("v1");

// Get your own friends
// #personal
friendsV1Api.get("/", auth, (ctx) => {
  return ctx.json({});
});

// Get invites
// #auth
// #personal
friendsV1Api.get("/invites", (ctx) => {});

// Invite a user
// #auth
// #personal
friendsV1Api.post(
  "/invites",
  zValidator("json", z.object({ user: z.string() })),
  (ctx) => {},
);

// Accept or decline an invite
// #auth
// #personal
friendsV1Api.post(
  "/invites/:user",
  zValidator("query", z.object({ user: z.string() })),
  zValidator("json", z.object({ decision: z.coerce.boolean() })),
  (ctx) => {},
);

export default friendsV1Api;
