# express-clone
This express-clone was made as part of a project in the subject Multiagent systems at the Faculty of Organization and Informatics in Varaždin.

## How to use
There are 2 examples of usage of this library in the /public folder.

1. Install NodeJS
2. Install pnpm (or just use npm) with `npm install -g pnpm`
3. In terminal position to the root folder
4. In the terminal run `pnpm install` (it should install dependancies as well as prisma client)
5. To run execute `pnpm run dev` in terminal
6. The app should display 2 messages in terminal that the servers are running
  - the static website is available in your web browser under [localhost:3001/index.html](localhost:3001/index.html)
  - the REST server is running on [localhost:3000](localhost:3000)
    - available routes: /users (GET, POST), /users/:id (GET, PUT, DELETE)
