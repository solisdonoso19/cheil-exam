//endpoints de la api
const Hotels = require("./Hotels");

const Hotels = {
  get: async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotels.findOne({ _id: id });
    res.status(200).send(hotel);
  },
  list: async (req, res) => {
    const hotels = await Hotels.find();
    res.status(200).send(hotels);
  },
  create: async (req, res) => {
    const hotel = new Hotels(req.body);
    const savedHotel = await hotel.save();
    res.status(201).send(savedHotel._id);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotels.findOne({ _id: id });
    Object.assign(hotel, req.body);
    await hotel.save();
    const hotels = await res.status(204);
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotels.findOne({ _id: id });
    if (hotel) {
      hotel.remove();
    } else {
      console.log("El hotel no existe!");
    }
    res.sendStatus(204);
  },
};

module.exports = Hotels;
