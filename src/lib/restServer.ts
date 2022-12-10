import { RestServerProps, RouteProps } from "../types/server";
import http, { ServerResponse } from "http";
import { GetRegexForPaths, ParseUrlParams } from "./parsers";

/**
 * Creates a REST server instance.
 */
async function CreateRestServer(args: RestServerProps) {
  const server = http.createServer((req, res) => {
    const urlString = req.url ?? "";

    console.log(urlString);

    // Set headers for CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Sort routes by paths and reverse them so that we don't run into problems with regex later.
    // In edge cases where for example Regex for /user/:id would also be valid for /user/edit
    // if /user/:id runs before it.
    const routes = args.routes.sort((a, b) => (a.path < b.path ? 1 : -1));

    const allPaths = DefineRouteShape(routes);

    const pathsRegex = GetRegexForPaths(allPaths);

    // Regex for the route corresponding to the current url
    const matchingRegex = pathsRegex.find((x) => x.test(urlString));

    // Get the route which corresponds with the current url
    const matchingRoute = matchingRegex ? routes[pathsRegex.indexOf(matchingRegex)] : undefined;

    // If the route doesn't exist throw NOT_FOUND
    if (!matchingRoute) {
      HandleError(res, 404, "NOT_FOUND");
      return;
    }

    // If if the route method is ANY,
    // or the request method matches the route method
    // execute thr provided code
    // else throw METHOD_NOT_ALLOWED error
    if (
      matchingRoute.method === "ANY" ||
      matchingRoute.method.toUpperCase() === req.method?.toUpperCase()
    ) {
      const params = ParseUrlParams({ path: matchingRoute.path, url: urlString });
      const extendedRequest = {
        ...req,
        params,
      };

      matchingRoute.work(extendedRequest, res);
    } else {
      HandleError(res, 405, "METHOD_NOT_ALLOWED");
      return;
    }
  });

  return server;
}

export default CreateRestServer;

/**
 * Handles returning an error response to the user.
 */
function HandleError(res: ServerResponse, code: number, message: string) {
  res.statusCode = code;
  res.end(message);
}

/**
 * Validates the path structure and returns all
 * available paths from passed routes as an array.
 */
function DefineRouteShape(routes: Array<RouteProps>) {
  return routes.map((_route) => {
    let _path = _route.path;

    // Check if path starts with / if not add it
    _path[0] === "/" ? (_path = "/" + _path) : _path;

    // Check if path ends with / if yes remove it
    _path[_path.length - 1] === "/" ? _path.slice(0, -1) : _path;

    return _path;
  });
}
