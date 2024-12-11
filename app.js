document.addEventListener('DOMContentLoaded', function() {
  const installButton = document.getElementById('install-button');

  if (installButton) {
      installButton.addEventListener('click', function() {
          console.log('Install button clicked');
      });
  }

  console.log('DOM fully loaded and parsed');
  fetchQuote();
});

const API_URL = 'https://juegozombi-3447d-default-rtdb.firebaseio.com/.json';

function fetchQuote() {
  console.log("Intentando obtener una cita...");

  fetch(API_URL)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error en la respuesta: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log("Datos obtenidos:", data);
          displayQuote(data);
      })
      .catch(error => console.error('Error al obtener la cita:', error));
}

function displayQuote(quoteData) {
  const container = document.getElementById('games-container');
  if (container) {
      if (quoteData.character && quoteData.character.personajes) {
          container.innerHTML = `<p><strong>${quoteData.character.personajes}:</strong></p>`;
      } else {
          container.innerHTML = `<p>No se pudo cargar la información del personaje.</p>`;
      }
      console.log("Cita mostrada correctamente");
  } else {
      console.error("No se encontró el contenedor en el DOM.");
  }
}

const personajesContainer = document.getElementById("personajes-container");

function mostrarPersonajes(personajes) {
  personajesContainer.innerHTML = ""; // Limpiamos el contenedor
  personajes.forEach((personaje) => {
    const personajeDiv = document.createElement("div");
    personajeDiv.classList.add("personaje");

    personajeDiv.innerHTML = `
      <img src="${personaje.imagen}" alt="${personaje.nombre}" />
      <h2>${personaje.nombre}</h2>
      <p>${personaje.descripcion}</p>
      <p>Daño: ${personaje.daño}</p>
    `;

    personajesContainer.appendChild(personajeDiv);
  });
}

console.log("Mostrando personajes...");
console.log(personajes); // Asegúrate de que los datos tienen la estructura esperada
