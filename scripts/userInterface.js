/* const socket = io(); */

document.addEventListener("DOMContentLoaded", async function () {
    const loggedInUserPhoneNumber = localStorage.getItem("loggedInUserPhoneNumber");
    const userStatus = localStorage.getItem("userStatus");
  
    if (loggedInUserPhoneNumber && userStatus === "conectado") {
      try {
        // Obtén el ID del usuario del localStorage (phoneNumber puede usarse como ID en este caso)
        const userId = localStorage.getItem("loggedInUserId");
  
        // Haz una solicitud al servidor para obtener los datos del usuario por su ID
        const response = await axios.get(`https://wha-uhex.onrender.com/users/${userId}`);
        if (response.status === 200) {
          const user = response.data;
  
          // Aquí puedes usar los datos del usuario para personalizar la interfaz
          console.log("Datos del usuario:", user);
  
          // Puedes acceder a los campos específicos del usuario y actualizar la interfaz
          const userNameElement = document.getElementById("user-name");
          const userImgElement = document.getElementById("user-img");
          userImgElement.src = user.img;
          userNameElement.innerHTML = `${user.name} ${user.lastName}`;
  
          // Otros campos de la interfaz pueden actualizarse de manera similar
          // Ejemplo:
          // const userAgeElement = document.getElementById("user-age");
          // userAgeElement.innerHTML = `${user.age} años`;
  
          // Actualiza la interfaz según los datos del usuario
        } else {
          console.error("Error al obtener datos del usuario:", response);
          // Maneja el error adecuadamente
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        // Maneja el error adecuadamente
      }
    }
  });
  

/*   document.addEventListener("DOMContentLoaded", async function () {
    const loggedInUserPhoneNumber = localStorage.getItem("loggedInUserPhoneNumber");
    const userStatus = localStorage.getItem("userStatus");
  
    if (loggedInUserPhoneNumber && userStatus === "conectado") {
      // Escucha las actualizaciones de usuarios a través de socket.io
      socket.on('userUpdate', (user) => {
        // Renderiza la información del usuario en la interfaz del usuario
        renderUserInfo(user);
      });
    }
  });
  
  function renderUserInfo(user) {
    // Código para renderizar la información del usuario actual en la interfaz de usuario
    const userNameElement = document.getElementById("user-name");
    const userImgElement = document.getElementById("user-img");
    userImgElement.src = user.img;
    userNameElement.innerHTML = `${user.name} ${user.lastName}`;
    // Otros campos de la interfaz pueden actualizarse de manera similar
  } */
  