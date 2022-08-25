//variable para instalar dependencias
const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("corriendo con exito");
});

app.post("/", (req, res) => {
  res.status(201).send("corriendo con exito");
});

app.listen(port, () => {
  console.log("Arrancando con exito!");
});
