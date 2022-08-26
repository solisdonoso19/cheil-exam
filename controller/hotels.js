const mongoose = require("mongoose"); //instancia de libreria mongoose
//conexion a la base de datos
try {
  mongoose.connect(
    "mongodb+srv://admin:admin@cheil-api.xqhtidq.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (error) {
  console.log("Error al conectarse a la base de datos." + error);
}

//creando el modelo en MongoDB
const Hotel = mongoose.model("Hotel", {
  //id: Number,
  name: { type: String, required: true, minLength: 4 },
  category: { type: String, required: true, maxLength: 1 },
  price: { type: Number, required: true },
  images: {
    img1: String,
    img2: String,
    img3: String,
  },
  reviews: {
    points: { type: Number, required: true, maxLength: 1 },
    comment: { type: String, maxLength: 255 },
  },
});
module.exports = Hotel;

const create = async () => {
  const hotel = new Hotel({
    name: "Miramar",
    category: "5 Estrellas",
    price: 50,
    images: {
      img1: "imagen 1",
      img2: "imagen 2",
      img3: "imagen 3",
    },
    reviews: {
      points: 5,
      comment: "Bonito hotel",
    },
  });

  try {
    const saveHotel = await hotel.save();
    console.log(saveHotel);
  } catch (error) {
    console.log(error);
  }
};

//create();
const searchAll = async () => {
  try {
    const hotels = await Hotel.find();
    console.log(hotels);
  } catch (error) {
    console.log(error);
  }
};

searchAll();
