import { Hono } from "hono";
import themesV1Api from "./v1.js";

const themesApi = new Hono().basePath("/themes");

themesApi.route("/", themesV1Api);

export default themesApi;
