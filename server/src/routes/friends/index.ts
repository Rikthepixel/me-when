import { Hono } from "hono";
import friendsV1Api from "./v1.js";

const friendsApi = new Hono().basePath("friends");

friendsApi.route("/", friendsV1Api);

export default friendsApi;
