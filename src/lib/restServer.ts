import { RestServerProps, RouteProps } from "../types/server";
import http, { IncomingMessage, ServerResponse } from "http";
import { GetRegexForPaths, ParseUrlParams, ParseRequestData } from "./parsers";

/**
 * Creates a REST server instance.
 */
async function CreateRestServer(args: RestServerProps) {
  const server = http.createServer((req, res) => {
    const urlString = req.url ?? "";

    // Set headers for CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Sort routes by paths and reverse them so that we don't run into problems with regex later.
    // In edge cases where for example Regex for /user/:id would also be valid for /user/edit
    // if /user/:id runs before it.
    const routes = args.routes.sort((a, b) => (a.path < b.path ? 1 : -1));
    const extendedRoutes = routes.map((x) => {
      return { ...x, id: routes.indexOf(x) };
    });

    const allPaths = extendedRoutes.map((x) => {
      return { id: x.id, path: x.path, method: x.method };
    });

    const pathsRegex = GetRegexForPaths(allPaths);

    // Regex for the route corresponding to the current url
    const matchingRegex = pathsRegex.find(
      (x) => x.regex.test(urlString) && x.method === req.method?.toUpperCase()
    );

    // Get the route which corresponds with the current url
    const matchingRoute = matchingRegex
      ? extendedRoutes.find((x) => x.id === matchingRegex.id)
      : undefined;

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

      // POST and PUT request can have a body, and if they
      // are we need to parse the incomming request data
      if (req.method === "PUT" || req.method === "POST") {
        /**
         * Since a basic http request comes in chunks we need to parse it.
         *
         * It reads the data inside a JSON body and returns an object with
         * the passed json data.
         *
         * TODO implement checks for form-data, x-ww-form-urlencoded, graphQL, binary, text...
         */
        const chunks: Uint8Array[] = [];
        let body: Record<string, string> | undefined = {};

        req.on("data", (chunk) => {
          chunks.push(chunk);
        });

        req.on("end", () => {
          const data = Buffer.concat(chunks);
          const dataString = data.toString();

          try {
            body = JSON.parse(dataString);

            const extendedRequest = {
              ...req,
              params,
              body,
            };

            // After all data is received then respond to client request
            matchingRoute.work(extendedRequest, res);
          } catch (err) {
            console.log(err);
            body = undefined;
            HandleError(res, 500, "SERVER_ERROR");
          }
        });

        req.on("error", (err) => {
          HandleError(res, 500, "SERVER_ERROR");
        });
      } else {
        const extendedRequest = {
          ...req,
          params,
          body: undefined,
        };

        matchingRoute.work(extendedRequest, res);
      }
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
