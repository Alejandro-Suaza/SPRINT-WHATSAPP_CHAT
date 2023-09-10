const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data", "db.json")); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://alejandro-suaza.github.io"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Servidor JSON-Server en ejecución en el puerto ${port}`);
});
