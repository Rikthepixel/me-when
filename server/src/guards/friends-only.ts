import { HTTPException } from "hono/http-exception";

/** Requires two users to be friends with each other */
export async function friendsOnly(userA: string, userB: string) {
  const areFriends = true;

  if (!areFriends) {
    throw new HTTPException(403, {
      message: "You and the requested user aren't friends",
    });
  }
}
