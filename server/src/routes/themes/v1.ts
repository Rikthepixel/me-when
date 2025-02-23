import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "../../guards/auth";
import { HTTPException } from "hono/http-exception";

const themesV1Api = new Hono().basePath("/v1");

// #shape { id: number, category_id: number, descriptor: string, date: Date }[]
// Themes should be generated on the earliest timezone to reach a new day.
// Once other timezones reach that day, they switch over to the new theme

const categories = [{ id: 1, name: "Programming" }];

const themes = [
  {
    id: 2,
    category_id: 1,
    descriptor: "jr. engineer dropped the database",
    date: new Date(),
  },
  {
    id: 1,
    category_id: 1,
    descriptor: "production is down",
    date: new Date(Date.now() - 24 * 60 * 60_000),
  },
];

const SECONDS_IN_A_DAY = 24 * 60 * 60_000;

// Get the theme of a given category
// #response { theme: string, seconds_till_next: number }
// #personal: based on user's selected timezone
themesV1Api.get(
  "/:category",
  zValidator(
    "query",
    z.object({ category: z.coerce.number().int().positive() }),
  ),
  auth,
  (ctx) => {
    const date = new Date();
    const category = ctx.req.valid("query").category;

    const currentTheme = themes.find(
      (theme) =>
        theme.category_id === category &&
        theme.date.toDateString() === date.toDateString(),
    );

    if (!currentTheme) {
      throw new HTTPException(404, {
        message: "Theme couldn't be found, perhaps the category doesn't exist?",
      });
    }

    const elapsedSeconds =
      date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();

    return ctx.json({
      theme: currentTheme.descriptor,
      secondsTillNext: SECONDS_IN_A_DAY - elapsedSeconds,
    });
  },
);


export default themesV1Api;
