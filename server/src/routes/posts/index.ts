
import { Hono } from "hono";
import postsV1Api from "./v1";

const postsApi = new Hono().basePath("/posts")

postsApi.route("/", postsV1Api)


export default postsApi
