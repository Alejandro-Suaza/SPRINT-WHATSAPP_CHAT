document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-form");
    const errorText = document.querySelector(".error-text");
  
    // Función para obtener el último ID desde la base de datos, encontrar el último Id y en caso de no haber usuarios, empieza desde 0
    async function getLastUserId() {
      try {
        const response = await axios.get("http://localhost:3000/users");
  
        if (response.status === 200) {
          const users = response.data;
          if (users.length > 0) {
            const lastUser = users[users.length - 1];
            return lastUser.id;
          } else {
            return 0;
          }
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return -1; // Manejo de error, puedes establecer el valor deseado
      }
    }
  
    // Función para verificar si un número de teléfono ya está registrado
    async function isPhoneNumberRegistered(phoneNumber) {
      try {
        const response = await axios.get("http://localhost:3000/users");
        if (response.status === 200) {
          const users = response.data;
          return users.some((user) => user.phoneNumber === phoneNumber);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return false; // Manejo de error, puedes establecer el valor deseado
      }
    }
  
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
        // Verifica si el número de teléfono ya está registrado
        const phoneNumberRegistered = await isPhoneNumberRegistered(phoneNumber);
  
        if (phoneNumberRegistered) {
          errorText.textContent = "Este número ya está registrado.";
          errorText.style.display = "block";
        } else {
          // Obtén el último ID desde la base de datos
          const lastUserId = await getLastUserId();
  
          if (lastUserId !== -1) {
            // Incrementa el contador para obtener el próximo ID
            const nextUserId = lastUserId + 1;
  
            try {
              const response = await axios.post("http://localhost:3000/users", {
                id: nextUserId,
                name,
                lastName,
                phoneNumber,
                password,
                img,
              });
  
              // Muestra un mensaje de éxito
              errorText.textContent = "Usuario creado exitosamente.";
              errorText.style.color = "green"; // Color verde para indicar éxito
  
              // Redirige al usuario después de un breve retraso (por ejemplo, 2 segundos)
              setTimeout(() => {
                window.location.replace("../users.html");
              }, 2000); // 2000 milisegundos = 2 segundos
            } catch (error) {
              console.error("Error al crear usuario:", error);
              errorText.textContent = "Error al crear usuario.";
            }
          } else {
            errorText.textContent = "Error al obtener el último ID.";
          }
        }
      }
    });
  });
  