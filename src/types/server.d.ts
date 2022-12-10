import { IncomingMessage, ServerResponse } from "http";

export type ReqType = "GET" | "POST" | "PUT" | "DELETE" | "ANY";

export type ServerInitProps = StaticServerProps | RestServerProps;

/**
 * @param folder path to folder to serve relative to the root folder of the project
 * @param port port number
 */
type StaticServerProps = {
  type: "static";
  folder: string;
  port: number;
};

type RestServerProps = {
  type: "rest";
  port: number;
  routes: Array<RouteProps>;
};

export type RouteProps = {
  path: string;
  method: ReqType;
  work: (req: ExtendedIncommingMessage, res: ServerResponse) => void;
};

export type ExtendedIncommingMessage<T extends RequestParams> = IncomingMessage & {
  params?: T;
  body?: T;
};

export type RequestParams = Record<string, string>;
