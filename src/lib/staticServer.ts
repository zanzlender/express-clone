import { StaticServerProps } from "../types/server";
import http from "http";
import fs from "fs";

/**
 * Creates a static server instance.
 */
async function CreateStaticServer(args: StaticServerProps) {
  // Initialize Node server
  const server = http.createServer((req, res) => {
    const filePath = `${args.folder}/${req.url}`;

    fs.readFile(filePath, (err, data) => {
      // If no file is found return 404 NOT_FOUND
      if (err) {
        res.statusCode = 404;
        res.write("NOT_FOUND");
        return res.end();
      }

      // Get the file type
      const type = req.url?.split(".").pop();

      // TODO Extend MIME types
      // Set Content header depending on file type
      switch (type) {
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
        default: {
          res.writeHead(200, { "Content-Type": "text/html" });
          break;
        }
      }

      res.write(data);
      res.end();
    });
  });

  return server;
}

export default CreateStaticServer;
