import { Hono } from "hono";

const usersApi = new Hono().basePath("/users");

export default usersApi;
