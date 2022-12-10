import { initializeServer } from "./lib/index";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

// REST server example
initializeServer({
  type: "rest",
  port: 3000,
  routes: [
    {
      method: "GET",
      path: "/users",
      work: async (req, res) => {
        try {
          const foundUsers = await Prisma.user.findMany();

          res.statusCode = 200;
          res.end(JSON.stringify(foundUsers));
        } catch (err) {
          res.statusCode = 500;
          res.end("SERVER_ERROR");
        }
      },
    },
    {
      method: "GET",
      path: "/users/:id",
      work: async (req, res) => {
        try {
          const { id } = req.params;
          const parsedId = parseInt(id);

          const foundUser = await Prisma.user.findFirst({
            where: {
              id: parsedId,
            },
          });

          res.statusCode = 200;
          res.end(JSON.stringify(foundUser));
        } catch (err) {
          res.statusCode = 500;
          res.end("SERVER_ERROR");
        }
      },
    },
    {
      method: "POST",
      path: "/users",
      work: async (req, res) => {
        try {
          const { name, email } = req.body;

          const createdUser = await Prisma.user.create({
            data: {
              email: email,
              name: name,
            },
          });

          res.statusCode = 200;
          res.end(JSON.stringify(createdUser));
        } catch (err) {
          res.statusCode = 500;
          res.end("SERVER_ERROR");
        }
      },
    },
    {
      method: "PUT",
      path: "/users/:id",
      work: async (req, res) => {
        try {
          const { id } = req.params;
          const parsedId = parseInt(id);

          const updatedUser = await Prisma.user.update({
            where: {
              id: parsedId,
            },
            data: {
              name: req.body.name,
              email: req.body.email,
            },
          });

          res.statusCode = 200;
          res.end(JSON.stringify(updatedUser));
        } catch (err) {
          res.statusCode = 500;
          res.end("SERVER_ERROR");
        }
      },
    },
    {
      method: "DELETE",
      path: "/users/:id",
      work: async (req, res) => {
        try {
          const { id } = req.params;
          const parsedId = parseInt(id);

          await Prisma.user.delete({
            where: {
              id: parsedId,
            },
          });

          res.statusCode = 200;
          res.end("OK");
        } catch (err) {
          res.statusCode = 500;
          res.end("SERVER_ERROR");
        }
      },
    },
  ],
});
