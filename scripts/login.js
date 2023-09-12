/* import axios from 'axios'; */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const errorText = document.querySelector(".error-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value.trim();

    if (phoneNumber === "" || password === "") {
      errorText.textContent = "Todos los campos son obligatorios.";
      errorText.style.display = "block";
    } else {
      try {
        const response = await axios.get("https://wha-uhex.onrender.com/users?phoneNumber=" + phoneNumber + "&password=" + password);

        if (response.status === 200) {
          const users = response.data;
          if (users.length === 1) {
            // El inicio de sesión fue exitoso, almacenar información en localStorage o sessionStorage.
            const user = users[0];
            
            await updateUserStatus(user.id, "conectado");

            localStorage.setItem("loggedInUserId", user.id);
            localStorage.setItem("loggedInUserPhoneNumber", phoneNumber);
            localStorage.setItem("userStatus", "conectado");


            window.location.href = "../users.html";
          } else {
            errorText.textContent = "Credenciales incorrectas.";
            errorText.style.display = "block";
          }
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        errorText.textContent = "Error al iniciar sesión.";
        errorText.style.display = "block";
      }
    }
  });

  async function updateUserStatus(userId, status) {
    try {
      const response = await axios.patch(`https://wha-uhex.onrender.com/users/${userId}`, {
        flag: status
      });
      if (response.status === 200) {
        console.log(`Estado del usuario actualizado a ${status}`);
      } else {
        console.error("Error al actualizar el estado del usuario:", response);
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  }
});