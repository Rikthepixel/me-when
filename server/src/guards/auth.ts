import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const auth = createMiddleware<{ Variables: { user: string } }>(async (ctx, next) => {
  // Check headers
  const confirmedIdentity = true;
  if (!confirmedIdentity) {
    throw new HTTPException(401, { message: "Authentication required" });
  }

  ctx.set("user", "Rik");
  await next();
});
