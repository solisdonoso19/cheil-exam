//template para el formulario de creacion de hoteles
const loadInitialTemplate = () => {
  const formTemplate = `
    <h1 class="ps-5 pe-5">Añadir Hotel</h1>
    <form class="ps-5 pe-5 pb-5" id="hotel-form">
        <div id="create-form">
            <label>Nombre</label>
            <input class="form-control" name="name" />
            
            <label>Categoria</label>
            <input class="form-control"  name="category" />
            
            <label>Precio</label>
            <input class="form-control" name="price" />
            
            <label>Imagen #1</label>
            <input class="form-control" name="img1" />

            <label>Imagen #2</label>
            <input class="form-control" name="img2" />

            <label>Imagen #3</label>
            <input class="form-control" name="img3" />
            
            <label>Puntaje</label>
            <input class="form-control" name="points" />
            
            <label>Comentario</label>
            <input class="form-control" name="comment" />
            
        </div>

        <button class="mt-3 btn btn-primary"type="submit">Crear</button>
    </form>
    
    <h1>Lista de hoteles</h1>
    <div>
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" id="hotel-list">
      </div>
    </div>
    `;

  const body = document.getElementsByTagName("div")[0];
  body.innerHTML = formTemplate;
};

const getHotels = async () => {
  const response = await fetch("/hotels");
  const hotels = await response.json();
  const template = (hotel) => `
    <div class="col">
      <div class="shadow-sm p-3 mb-5 bg-body rounded">
        <div id="carouselExampleControls${hotel._id}" class="carousel slide" >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${hotel.images.img1}" class="w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${hotel.images.img2}" class="w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${hotel.images.img3}" class="w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${hotel._id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${hotel._id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h5>${hotel.name}</h5>
      <p>Categoria:    ${hotel.category} ⭐️</p>
      <p class="fw-bold text-success">Precio:       $${hotel.price}</p>
      <p>Calificacion: ${hotel.reviews.points}</p>
      <p>Comentario:   ${hotel.reviews.comment}</p>
      <button class="btn btn-danger " data-id="${hotel._id}">Eliminar</button>
    </div>
  </div>
    `;

  const hotelList = document.getElementById("hotel-list");
  hotelList.innerHTML = hotels.map((hotel) => template(hotel)).join("");
  hotels.forEach((hotel) => {
    const hotelNodeDelete = document.querySelector(`[data-id="${hotel._id}"]`);
    hotelNodeDelete.onclick = async (e) => {
      await fetch(`/hotels/${hotel._id}`, {
        method: "DELETE",
      });
      hotelNodeDelete.parentNode.remove();
      alert(`Hotel ${hotel.name} eliminado con exito!`);
    };
  });
};

const addFormListener = () => {
  const hotelForm = document.getElementById("hotel-form");
  hotelForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(hotelForm);
    const data = Object.fromEntries(formData.entries());
    const data2 = {
      name: data.name,
      category: data.category,
      price: data.price,
      images: {
        img1: data.img1,
        img2: data.img2,
        img3: data.img3,
      },
      reviews: {
        points: data.points,
        comment: data.comment,
      },
    };
    console.log(data2);
    await fetch("/hotels", {
      method: "POST",
      body: JSON.stringify(data2),
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
  getHotels();
};
