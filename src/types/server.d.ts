import http, { IncomingMessage, ServerResponse } from "http";
export type ExpressServer = typeof http.Server & {
  name: string;
};

export type ReqType = "GET" | "POST" | "PUT" | "DELETE" | "ANY";

export interface PathHandler {
  path: string;
  reqType: ReqType;
  handler: ServerRequestHandler;
}

export type ServerRequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextHandler
) => void;

export type NextHandler = () => void;

export interface RequestType extends IncomingMessage {
  baseUrl: string;
  query: URLSearchParams;
  path: string;
  params: Record<string, any>;
  [_: string]: any;
}
