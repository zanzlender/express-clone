import { initializeServer } from "./lib/index";

// Static server example
/* const staticServer = initializeServer({
  type: "static",
  path: "/",
  port: 3000,
  folder: "public",
}); */

// REST server example
const restServer = initializeServer({
  type: "rest",
  port: 3000,
  routes: [
    {
      method: "GET",
      path: "/users/:id/edit/:id2",
      work: (req, res) => {
        res.statusCode = 200;
        res.end("Hija");
      },
    },
    {
      method: "GET",
      path: "/users/:id",
      work: (req, res) => {
        res.statusCode = 200;
        res.end("Hija2");
      },
    },
  ],
});
