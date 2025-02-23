import { Hono } from "hono";

const categoriesV1Api = new Hono().basePath("/v1");

export default categoriesV1Api;
