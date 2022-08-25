//variable para instalar dependencias
const express = require("express");
const hotels = require("./controller/hotels");
const app = express();

const port = 3000;

app.get("/", hotels.list);
app.post("/", hotels.create);
app.get("/:id", hotels.get);
app.put("/:id", hotels.update);
app.patch("/:id", hotels.update);
app.delete("/:id", hotels.destroy);

app.listen(port, () => {
  console.log("Corriendo APP");
});
