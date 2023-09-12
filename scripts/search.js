const searchBar = document.querySelector(".users .search input"),
  searchBtn = document.querySelector(".users .search button"),
  usersList = document.querySelector(".users-list");

searchBtn.onclick = () => {
  searchBar.classList.toggle("active");
  searchBar.focus();
  searchBtn.classList.toggle("active");
};

// Obtener la información del usuario actual almacenada en el localStorage
const userId = localStorage.getItem("loggedInUserId");

if (userId) {
  // Enviar información del usuario al servidor para obtener la lista de usuarios
  axios.post("https://wha-uhex.onrender.com/users", userId, { timeout: 5000 })
    .then((response) => {
      // Verifica si la respuesta es exitosa (código de estado 200)
      if (response.status === 200) {
        let data = response.data;

        if (data.length === 0) {
          usersList.innerHTML = "No users are available to chat";
        } else {
          // Procesa la lista de usuarios y muestra en usersList
          let userListHTML = '';

          data.forEach((user) => {
            // Construye la representación de usuario y agrega al userListHTML
            userListHTML += `
              <a href="#">
                <div class="content">
                  <img src="./data.${user.img}" alt="${user.name}">
                  <div class="details">
                    <span>${user.name}</span>
                    <p>${user.mensaje}</p>
                  </div>
                </div>
                <div class="status-dot"><i class="fas fa-circle"></i></div>
              </a>
            `;
          });

          usersList.innerHTML = userListHTML;
        }
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
} else {
  // Si no se encuentra la información del usuario en el localStorage, realiza alguna acción apropiada, como redirigir a la página de inicio de sesión.
  console.log("Información de usuario no encontrada en el localStorage");
  // Redirige a la página de inicio de sesión o realiza alguna otra acción apropiada.
}


/* const searchBar = document.querySelector(".users .search input"),
  searchBtn = document.querySelector(".users .search button"),
  usersList = document.querySelector(".users-list");

searchBtn.onclick = () => {
  searchBar.classList.toggle("active");
  searchBar.focus();
  searchBtn.classList.toggle("active");
};

// Obtener la información del usuario actual almacenada en el localStorage
const loggedInUserId = localStorage.getItem("loggedInUserId");

if (loggedInUserId) {
  // Enviar información del usuario actual al servidor para obtener la lista de usuarios
  axios.get(`https://wha-uhex.onrender.com/users/${loggedInUserId}`)
    .then((response) => {
      // Verifica si la respuesta es exitosa (código de estado 200)
      if (response.status === 200) {
        const user = response.data;
        // Renderiza la información del usuario actual en la lista de usuarios
        renderUserInList(user);
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
} else {
  // Si no se encuentra la información del usuario en el localStorage, realiza alguna acción apropiada, como redirigir a la página de inicio de sesión.
  console.log("Información de usuario no encontrada en el localStorage");
  // Redirige a la página de inicio de sesión o realiza alguna otra acción apropiada.
}

function renderUserInList(user) {
  // Código para renderizar la información del usuario en la lista de usuarios
  const userElement = document.createElement("a");
  userElement.href = "#";
  userElement.innerHTML = `
    <div class="content">
      <img src="${user.img}" alt="${user.name}">
      <div class="details">
        <span>${user.name} ${user.lastName}</span>
        <p>${user.mensaje}</p>
      </div>
    </div>
    <div class="status-dot"><i class="fas fa-circle"></i></div>
  `;

  usersList.appendChild(userElement);
}
 */