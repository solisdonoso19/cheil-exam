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
app.get("/", endpoints.list);
app.post("/", endpoints.create);
app.get("/:id", endpoints.get);
app.put("/:id", endpoints.update);
app.patch("/:id", endpoints.update);
app.delete("/:id", endpoints.destroy);

app.get("*", (req, res) => {
  res.status(404).send("Esta Pagina no existe");
});

app.listen(port, () => {
  console.log("Corriendo APP");
});
