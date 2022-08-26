const mongoose = require("mongoose"); //instancia de libreria mongoose
//conexion a la base de datos
try {
  mongoose.connect(
    "mongodb+srv://admin:admin@cheil-api.xqhtidq.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (error) {
  console.log("Error al conectarse a la base de datos.");
}

//creando el modelo en MongoDB
const Hotel = mongoose.model("Hotel", {
  //id: Number,
  name: String,
  category: String,
  price: Number,
  images: {
    img1: String,
    img2: String,
    img3: String,
  },
  reviews: {
    points: Number,
    comment: String,
  },
});

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

  const saveHotel = await hotel.save();
  console.log(saveHotel);
};

create();
