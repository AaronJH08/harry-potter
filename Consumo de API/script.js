
const lista = document.querySelector("#lista");
const buscar = document.querySelector("#buscar");
const casa = document.querySelector("#casa");

let personajes = [];
async function obtenerDatos() {

    try {
        const respuesta = await fetch(" https://hp-api.onrender.com/api/characters")
        personajes = await respuesta.json();

        mostrarDatos(personajes);
        
    } catch (error) {
        console.log("Error", error);
        
    }
    
}

function mostrarDatos(datos) {
    lista.innerHTML = "";

    if (datos.length === 0) {
        lista.innerHTML = "<p>No se encontro personaje</p>";
        return;
    }

    datos.forEach(function(personaje){

        let foto = personaje.image;

        if (!foto) {
            foto = "https://placehold.co/230x250?text=Sin+Foto";
        }

        let color = "#888";

        if(personaje.house === "Gryffindor") {
            color = "#ae0001";
        } else if (personaje.house === "Slytherin") {
            color = "#2a623d";
        } else if (personaje.house === "Ravenclaw") {
            color = "#0e5484";
        } else if (personaje.house === "Hufflepuff") {
            color = "#d4a017";
        }

        lista.innerHTML += `
            <div class="tarjeta" style="border-left-color: ${color}">
            <h3>${personaje.name}</h3>
            <img src="${foto}">
            <p>Casa: ${personaje.house || "Sin casa"}</p>
            <p>Especie: ${personaje.especies}</p>
            <p>Genero: ${personaje.gender}</p>
            <p>Actor: ${personaje.actor || "Desconocido"}</p>
            <p>Estado: ${personaje.alive ? "Vivo" : "Fallecido"}</p>
            </div>
        `;
    });
}

function filtrar() {
    let texto = buscar.ariaValueMax.toLowerCase();
    let opcion = casa.value;

    let resultado = personaje.filter(function(personaje){

        let datos = (
            personaje.name + "" +
            personaje.house + "" +
            personaje.especies + "" +
            personaje.gender + "" +
            personaje.actor + "" +
            (personaje.alive ? "Vivo" : "Fallecido")
        ) .toLowerCase();

        return datos.includes(texto) && (opcion === "" || personaje.house === opcion);
    });

    mostrarDatos(resultado);
}

buscar.addEventListener("input", filtrar);
casa.addEventListener("change", filtrar);

obtenerDatos();