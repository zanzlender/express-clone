import { RestServerProps, ServerInitProps, StaticServerProps } from "../types/server";
import http from "http";
import fs from "fs";

export const initializeServer = async (args: ServerInitProps) => {
  const port = args.port || 3000;

  const server = await CreateServer(args);

  server.listen(port, () => {
    console.log(`Server started! Listening on port: ${port}.`);
  });

  return server;
};

/**
 * Call Create static or rest server depending on passed args.
 */
async function CreateServer(args: ServerInitProps) {
  switch (args.type) {
    case "rest": {
      const server = await CreateRestServer({
        ...args,
      });
      return server;
    }
    case "static": {
      const server = await CreateStaticServer({
        ...args,
      });
      return server;
    }
  }
}

/**
 * Creates a static server instance.
 */
async function CreateStaticServer(args: StaticServerProps) {
  const server = http.createServer((req, res) => {
    fs.readFile(`public/${req.url}`, (err, data) => {
      console.log(data);

      if (err == null) {
        const type = req.url?.split(".");

        if (type)
          // TODO Extend MIME types
          switch (type[type?.length - 1]) {
            case "css": {
              res.writeHead(200, { "Content-Type": "text/css" });
              break;
            }
            case "html": {
              res.writeHead(200, { "Content-Type": "text/html" });
              break;
            }
            case "jpg": {
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              break;
            }
            case "png": {
              res.writeHead(200, { "Content-Type": "image/png" });
              break;
            }
            case "svg": {
              res.writeHead(200, { "Content-Type": "image/svg+xml" });
              break;
            }
            case "webp": {
              res.writeHead(200, { "Content-Type": "image/webp" });
              break;
            }
            case "js": {
              res.writeHead(200, { "Content-Type": "text/javascript" });
              break;
            }
            case "json": {
              res.writeHead(200, { "Content-Type": "text/json" });
              break;
            }
          }

        res.write(data);
        res.end();
      } else {
        res.write("404 - Not found");
        res.end();
      }
    });
  });

  return server;
}

/**
 * Creates a REST server instance.
 */
async function CreateRestServer(args: RestServerProps) {
  const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write("Hi");
    res.end();
  });

  return server;
}
