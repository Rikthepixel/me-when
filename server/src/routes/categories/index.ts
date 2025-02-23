import { Hono } from "hono";
import categoriesV1Api from "./v1";

const categoriesApi = new Hono().basePath("/categories")
categoriesApi.route("/", categoriesV1Api)

export default categoriesApi
