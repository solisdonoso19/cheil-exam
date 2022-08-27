/*
variable para instalar dependencias 
hotels: los controladores de los endpoints
app   : express.js
port  : puerto donde correra el proyecto en local
*/

const express = require("express");
const endpoints = require("./controller/endpoints");
const app = express();
const port = 3000;
app.use(express.json());

//llamando a los endpoints
app.get("/hotels", endpoints.list);
app.post("/hotels", endpoints.create);
app.get("/hotels/:id", endpoints.get);
app.put("/hotels/:id", endpoints.update);
app.patch("/hotels/:id", endpoints.update);
app.delete("/hotels/:id", endpoints.destroy);

app.use(express.static("client"));
app.use(express.static("assets"));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", (req, res) => {
  res.status(404).send("Esta Pagina no existe");
});

app.listen(port, () => {
  console.log("Corriendo APP");
});
