import { ServerInitProps } from "../types/server";
import CreateStaticServer from "./staticServer";
import CreateRestServer from "./restServer";

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
