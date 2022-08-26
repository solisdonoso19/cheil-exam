//template para el formulario de creacion de hoteles
const loadInitialTemplate = () => {
  const formTemplate = `
    <h1>Hoteles</h1>
    <form id="hotel-form">
        <div>
            <label>Nombre</label>
            <input name="name" />
            
            <label>Categoria</label>
            <input name="category" />
            
            <label>Precio</label>
            <input name="price" />
            
            <label>Imagen #1</label>
            <input name="img1" />

            <label>Imagen #2</label>
            <input name="img2" />

            <label>Imagen #3</label>
            <input name="img3" />
            
            <label>Puntaje</label>
            <input name="points" />
            
            <label>Comentario</label>
            <input name="comment" />
            
        </div>

        <button type="submit">Enviar</button>
    </form>
    
    <ul id="hotel-list"></ul>
    `;

  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};

const getHotels = async () => {
  const response = await fetch("/hotels");
  const hotels = await response.json();
  const template = (hotel) => `
    <li>${hotel.name}</li>
    <li>${hotel.category}</li>
    <li>${hotel.price}</li>
    <li>${hotel.images.img1}</li>
    <li>${hotel.images.img2}</li>
    <li>${hotel.images.img3}</li>
    <li>${hotel.reviews.points}</li>
    <li>${hotel.reviews.comment}</li>
    <button data-id="${hotel._id}">Eliminar</button>
    `;

  const hotelList = document.getElementById("hotel-list");
  hotelList.innerHTML = hotels.map((hotel) => template(hotel)).join("");
  hotels.forEach((hotel) => {
    const hotelNode = document.querySelector(`[data-id="${hotel._id}"]`);
    hotelNode.onclick = async (e) => {
      await fetch(`/hotels/${hotel._id}`, {
        method: "DELETE",
      });
      hotelNode.parentNode.remove();
      alert(`Hotel ${hotel.name} eliminado con exito!`);
    };
  });
};

const addFormListener = () => {
  const hotelForm = document.getElementById("hotel-list");
  hotelForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(hotelForm);
    const data = Object.fromEntries(formData.entries());
    await fetch("/hotel", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    hotelForm.reset();
    getHotels();
  };
};

window.onload = () => {
  loadInitialTemplate();
  addFormListener();
};
