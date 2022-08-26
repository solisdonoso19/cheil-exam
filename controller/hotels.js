//endpoint de la api

const Hotels = {
  get: (req, res) => {
    res.status(200).send("Este es un Hotel!");
  },
  list: (req, res) => {
    res.status(200).send("Listando...");
  },
  create: (req, res) => {
    res.status(201).send("Creando...");
  },
  update: (req, res) => {
    res.status(204).send("Actualizando...");
  },
  destroy: (req, res) => {
    res.status(204).send("Eliminando...");
  },
};

module.exports = Hotels;
