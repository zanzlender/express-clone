import { StaticServerProps } from "../types/server";
import http from "http";
import fs from "fs";

/**
 * Creates a static server instance.
 */
async function CreateStaticServer(args: StaticServerProps) {
  const server = http.createServer((req, res) => {
    const filePath = `${args.folder}/${req.url}`;

    fs.readFile(filePath, (err, data) => {
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
        res.statusCode = 404;
        res.write("NOT_FOUND");
        res.end();
      }
    });
  });

  return server;
}

export default CreateStaticServer;
