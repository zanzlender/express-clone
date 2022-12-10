import { initializeServer } from "./lib/index";

// Static server example
initializeServer({
  type: "static",
  port: 3001,
  folder: "public/example_static/web",
});
