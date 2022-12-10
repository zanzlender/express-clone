import { IncomingMessage } from "http";
import { ReqType, RequestParams } from "../types/server";

/**
 * Takes in a user defined path and the request url. It parses the dynamic
 * values in the request url (e.g. /users/:id) and returns a req object
 * which extends the Node req: IncomingMessage object with the
 * parameters and values in the variable params
 *
 * @param path user defined path
 * @param url url of request
 */
type ParseUrlParamsProps = {
  path: string;
  url: string;
};
export function ParseUrlParams({ url, path }: ParseUrlParamsProps) {
  // Array like [ '', 'users', ':id' ] - first is empty because of / at beginning
  const splitPath = path.split("/");

  // Get the url without query params, which should be the same as path
  //  then split that by / to get array like splitPath like [ '', 'users', '123' ]
  const urlWithoutParamsSplit = url.split("?")[0].split("/");

  // If the user defined path doesn't include : there are no dynamic
  // values so the next steps would be useless
  if (!path.includes(":")) return undefined;

  // Get only the dynamic values (prefixed with :)
  const paramsKeys = splitPath.filter((x) => x.includes(":"));

  // From the params array create a params object to attach to the request
  const params: RequestParams = paramsKeys?.reduce((acc, val) => {
    return {
      ...acc,
      [val.replace(":", "")]: urlWithoutParamsSplit[splitPath.indexOf(val)],
    };
  }, {});

  return params;
}

/**
 * REGEX FOR VALIDATING THE URL PATH
 *
 * Takes in an Array of paths and returns an array of regex expressions
 * for each of the passed api endpoint paths.
 *
 * e.g. /user/:id or /user/images?id=123
 *
 * The path MUST start with a / and MUST NOT have an / at the end.
 *
 * Path parts that have a prefixed : symbol are treated as dynamic routes.
 *
 * Query params are not validated by regex, meaning they can be anything.
 *
 * EXAMPLES
 * * /user/:id (/user/1) --> /^\/user\/[a-zA-Z0-9]+((\?)[a-zA-Z0-9=&]*)?/
 * * /user/:id/edit (/user/1/edit) --> /^\/user\/[a-zA-Z0-9]+\/edit((\?)[a-zA-Z0-9=&]*)?/
 *
 * @param paths paths of the api endpoints
 * @returns Array of regex expressions for given paths
 */
export function GetRegexForPaths(paths: Array<{ path: string; id: number; method: ReqType }>) {
  const regexForPaths = paths.map((p) => {
    const pathSplit = p.path.split("/");

    let regexString = "^";

    pathSplit.forEach((x) => {
      if (x === "") return;

      if (x.includes(":")) {
        regexString += "\\/[a-zA-Z0-9-_]+";
      } else {
        regexString += "\\/" + x;
      }
    });

    regexString += "((\\?)[a-zA-Z0-9=&-_]*)?$";

    return {
      id: p.id,
      regex: RegExp(regexString),
      method: p.method,
    };
  });

  return regexForPaths;
}

/**
 * Since a basic http request comes in chunks we need to parse it.
 *
 * It reads the data inside a JSON body and returns an object with
 * the passed json data.
 *
 * TODO implement checks for form-data, x-ww-form-urlencoded, graphQL, binary, text...
 */
export async function ParseRequestData(req: IncomingMessage) {
  const chunks: Uint8Array[] = [];
  let params: Record<string, string> | undefined = {};

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const data = Buffer.concat(chunks);
    const dataString = data.toString();

    console.log("DS", dataString);

    try {
      params = JSON.parse(dataString);
    } catch (err) {
      console.log(err);
      params = undefined;
    }
  });

  return params;
}
