document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sign-form");
  const errorText = document.querySelector(".error-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value.trim();
    const img = document.getElementById("img").value.trim();

    if (name === "" || lastName === "" || phoneNumber === "" || password === "" || img === "") {
      errorText.textContent = "Todos los campos son obligatorios.";
      errorText.style.display = "block";
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/users?phoneNumber=${phoneNumber}`);

        if (response.status === 200) {
          const users = response.data;
          if (users.length > 0) {
            errorText.textContent = "Este número ya está registrado.";
            errorText.style.display = "block";
          } else {
            const lastUserIdResponse = await axios.get("http://localhost:3000/users?_sort=id&_order=desc&_limit=1");
            const lastUserId = lastUserIdResponse.data[0]?.id || 0;
            const nextUserId = lastUserId + 1;

            const createUserResponse = await axios.post("http://localhost:3000/users", {
              id: nextUserId,
              name,
              lastName,
              phoneNumber,
              password,
              img,
              flag: "desconectado", // Establecer el estado inicial del usuario como "desconectado"
            });

            if (createUserResponse.status === 201) {
              // Establecer el estado del usuario como "conectado" después del registro
              localStorage.setItem("userStatus", "conectado");
              window.location.href = "../users.html";
            } else {
              console.error("Respuesta inesperada del servidor:", createUserResponse);
              errorText.textContent = "Error al crear usuario.";
              errorText.style.display = "block";
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        errorText.textContent = "Error al crear usuario.";
        errorText.style.display = "block";
      }
    }
  });
});
