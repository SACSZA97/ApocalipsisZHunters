// app.js


document.addEventListener('DOMContentLoaded', function() {
    // Select the install button
    const installButton = document.getElementById('install-button');
  

    if (installButton) {
      // Add a click event listener to the install button
      installButton.addEventListener('click', function() {
        // Log a message to the console when the button is clicked
        console.log('Install button clicked');
      });
    }
  
    // Log a message to the console when the DOM is fully loaded
    console.log('DOM fully loaded and parsed');
  });
  
  console.log("Script app.js cargado"); // Verificación de que el archivo se está cargando

const API_URL = 'https://juegozombi-3447d-default-rtdb.firebaseio.com/.json';

function fetchQuote() {
    console.log("Intentando obtener una cita..."); // Verificación de que se llama a la función

    fetch(API_URL)
        .then(response => {
            console.log("Respuesta recibida:", response); // Mostrar la respuesta en consola
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos:", data); // Mostrar datos obtenidos en consola
            displayQuote(data);
        })
        .catch(error => console.error('Error al obtener la cita:', error));
}

function displayQuote(quoteData) {
    const container = document.getElementById('games-container');
    container.innerHTML = `
        <p><strong>${quoteData.character.personajes}:</strong></p>
    `;
    console.log("Cita mostrada correctamente");
}

// Llamar a la función al cargar la página
fetchQuote();
