import { CreateServer } from "./lib/index";
import { initializeServer } from "./lib/server";
import qs from "query-string";

const server = initializeServer({
  type: "static",
  path: "/",
  port: 3000,
  folder: "public",
});

/**
 * Parses url
 *
 * /api/user/:id
 * /api/user/:id/update
 * @param url
 */
function ParseUrl(url: string) {
  const paths = url.split("/");
  console.log(paths);
}
