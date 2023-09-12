document.addEventListener("DOMContentLoaded", async function () {
  const loggedInUserPhoneNumber = localStorage.getItem("loggedInUserPhoneNumber");
  const userStatus = localStorage.getItem("userStatus");

  if (loggedInUserPhoneNumber && userStatus === "conectado") {
    try {

      const userId = localStorage.getItem("loggedInUserId");

  
      const response = await axios.get(`https://wha-uhex.onrender.com/users/${userId}`);
      if (response.status === 200) {
        const user = response.data;


        console.log("Datos del usuario:", user);

        const userNameElement = document.getElementById("user-name");
        const userImgElement = document.getElementById("user-img");
        userImgElement.src = user.img;
        userNameElement.innerHTML = `${user.name} ${user.lastName}`;

     
      } else {
        console.error("Error al obtener datos del usuario:", response);

      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);

    }
  }
});
