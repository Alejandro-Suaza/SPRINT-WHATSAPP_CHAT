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
        const response = await axios.get(`http://localhost:3000/users?phoneNumber=${phoneNumber}&password=${password}`);

        if (response.status === 200) {
          const users = response.data;
          if (users.length === 1) {
            // El inicio de sesión fue exitoso, almacenar información en localStorage o sessionStorage.
            const user = users[0];
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            
            // Establecer el estado del usuario como "conectado"
            localStorage.setItem("userStatus", "conectado");

            // Redirige a la página de usuarios.
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
});
