// npm init
// npm install -g nodemon

const http = require("http");
const app = require("./app");

const port = normalizePort(process.env.PORT || 3000);

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
