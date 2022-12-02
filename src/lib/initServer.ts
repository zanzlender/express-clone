import http, { Server } from "http";
import { PathHandler, ServerRequestHandler } from "../types/server";

export interface HTTPServerProps {
  port?: number;
}

export default class CreateServer {
  private _server: Server;

  constructor(
    private readonly _port: number = 3000,
    private readonly _pathHandlers: PathHandler[] = []
  ) {
    this._server = http.createServer((req, res) => {
      res.write("Hi");
      res.end();
    });
  }

  get(path: string, ...handlers: ServerRequestHandler[]): void {
    for (const handler of handlers) {
      this._pathHandlers.push({ path: path, reqType: "GET", handler });
    }
  }

  post(path: string, ...handlers: ServerRequestHandler[]): void {
    for (const handler of handlers) {
      this._pathHandlers.push({ path: path, reqType: "POST", handler });
    }
  }

  put(path: string, ...handlers: ServerRequestHandler[]): void {
    for (const handler of handlers) {
      this._pathHandlers.push({ path: path, reqType: "PUT", handler });
    }
  }

  delete(path: string, ...handlers: ServerRequestHandler[]): void {
    for (const handler of handlers) {
      this._pathHandlers.push({ path: path, reqType: "DELETE", handler });
    }
  }

  all(path: string, ...handlers: ServerRequestHandler[]): void {
    for (const handler of handlers) {
      this._pathHandlers.push({ path: path, reqType: "ANY", handler });
    }
  }

  listen(): void {
    this._server.listen(this._port, () => {
      console.log(`Started HTTP server! Listening on port: ${this._port}.`);
    });
  }
}
