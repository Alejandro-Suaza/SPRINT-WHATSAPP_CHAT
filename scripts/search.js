const searchBar = document.querySelector(".users .search input"),
  searchBtn = document.querySelector(".users .search button"),
  usersList = document.querySelector(".users-list");

searchBtn.onclick = () => {
  searchBar.classList.toggle("active");
  searchBar.focus();
  searchBtn.classList.toggle("active");
};

const userId = localStorage.getItem("loggedInUserId");

if (userId) {
  axios.post("https://wha-uhex.onrender.com/users", userId, { timeout: 5000 })
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;

        if (data.length === 0) {
          usersList.innerHTML = "No users are available to chat";
        } else {
          let userListHTML = '';

          data.forEach((user) => {
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
  console.log("Información de usuario no encontrada en el localStorage");

}