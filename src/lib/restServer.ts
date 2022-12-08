import { RestServerProps } from "../types/server";
import http, { IncomingMessage } from "http";

/**
 * Creates a REST server instance.
 */
async function CreateRestServer(args: RestServerProps) {
  const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write("Hi");
    res.end();

    switch (req.method) {
      case "GET": {
        break;
      }
      case "POST": {
        break;
      }
      case "PUT": {
        break;
      }
      case "DELETE": {
        break;
      }
      case "ANY": {
        break;
      }
      default: {
        res.statusCode = 405;
        res.write("METHOD_NOT_ALLOWED");
        res.end();
        break;
      }
    }
  });

  return server;
}

export default CreateRestServer;

function handleGetRequest(req: IncomingMessage) {
  return;
}
