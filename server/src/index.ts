import { serve } from "@hono/node-server";
import { Hono } from "hono";
import friendsApi from "./routes/friends/index.js";
import usersApi from "./routes/users/index.js";
import { HTTPException } from "hono/http-exception";
import themesApi from "./routes/themes/index.js";

const app = new Hono();

app.route("/", themesApi);
app.route("/", friendsApi);
app.route("/", usersApi);

app.onError((err) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.error(err);
  return new HTTPException(500, {
    message: "An unknown error occurred",
  }).getResponse();
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
