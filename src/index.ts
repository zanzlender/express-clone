import http from "http";

http
  .createServer(function (req, res) {
    res.write("Hello world");
    res.end();
  })
  .listen(8080);
