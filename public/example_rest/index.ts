import { initializeServer } from "../../src/lib/index";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

// REST server example
initializeServer({
  type: "rest",
  port: 3000,
  routes: [
    {
      method: "GET",
      path: "/users/:id",
      work: async (req, res) => {
        const { id } = req.params;
        const parsedId = parseInt(id);

        const foundUser = await Prisma.user.findFirst({
          where: {
            id: parsedId,
          },
        });

        const userJson = JSON.stringify(foundUser);

        res.statusCode = 200;
        res.end(userJson);
      },
    },
    /* {
      method: "POST",
      path: "/users",
      work: (req, res) => {
        res.statusCode = 200;
        res.end("Hija2");
      },
    },
    {
      method: "PUT",
      path: "/users/:id",
      work: (req, res) => {
        res.statusCode = 200;
        res.end("Hija2");
      },
    },
    {
      method: "DELETE",
      path: "/users/:id",
      work: (req, res) => {
        res.statusCode = 200;
        res.end("Hija2");
      },
    }, */
  ],
});
