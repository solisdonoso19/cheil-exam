/*
variable para instalar dependencias 
hotels: los controladores de los endpoints
app   : express.js
port  : puerto donde correra el proyecto en local
*/

const express = require("express");
const hotels = require("./controller/hotels");
const app = express();

const port = 3000;
//llamando a los endpoints
app.get("/", hotels.list);
app.post("/", hotels.create);
app.get("/:id", hotels.get);
app.put("/:id", hotels.update);
app.patch("/:id", hotels.update);
app.delete("/:id", hotels.destroy);

app.get("*", (req, res) => {
  res.status(404).send("Esta Pagina no existe");
});

app.listen(port, () => {
  console.log("Corriendo APP");
});
