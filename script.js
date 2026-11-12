

const lista = document.querySelector("#lista");
const buscar = document.querySelector("#buscar");
const casa = document.querySelector("#casa");
const limpiar = document.querySelector("#limpiar");
const total = document.querySelector("#total");
const mensaje = document.querySelector("#mensaje");

let personajes = [];

async function obtenerDatos() {
    try {
        const respuesta = await fetch("./personajes.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el JSON");
        }

        personajes = await respuesta.json();

        if (!Array.isArray(personajes)) {
            throw new Error("El JSON debe contener un arreglo");
        }

        mensaje.textContent = "";
        filtrar();

    } catch (error) {
        console.log("Error:", error);
        mensaje.textContent = "No se pudieron cargar los personajes";
        total.textContent = "";
    }
}

function mostrarDatos(datos) {
    lista.innerHTML = "";

    total.textContent = "Personajes encontrados: " + datos.length;

    if (datos.length === 0) {
        lista.innerHTML = "<p>No se encontraron personajes</p>";
        return;
    }

    datos.forEach(function(personaje) {
        let foto = personaje.image;

        if (!foto) {
            foto = "https://placehold.co/230x250?text=Sin+foto";
        }

        let color = "#888";

        if (personaje.house === "Gryffindor") {
            color = "#ae0001";
        } else if (personaje.house === "Slytherin") {
            color = "#2a623d";
        } else if (personaje.house === "Ravenclaw") {
            color = "#0e5484";
        } else if (personaje.house === "Hufflepuff") {
            color = "#d4a017";
        }

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.style.borderLeftColor = color;

        const titulo = document.createElement("h3");
        titulo.textContent = personaje.name || "Sin nombre";

        const imagen = document.createElement("img");
        imagen.src = foto;
        imagen.alt = personaje.name || "Personaje";
        imagen.onerror = function() {
            imagen.onerror = null;
            imagen.src = "https://placehold.co/230x250?text=Sin+foto";
        };

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(imagen);

        const informacion = [
            "Casa: " + (personaje.house || "Sin casa"),
            "Especie: " + (personaje.species || "Desconocida"),
            "Género: " + (personaje.gender || "Desconocido"),
            "Actor: " + (personaje.actor || "Desconocido"),
            "Estado: " + (personaje.alive ? "Vivo" : "Fallecido")
        ];

        informacion.forEach(function(dato) {
            const parrafo = document.createElement("p");
            parrafo.textContent = dato;
            tarjeta.appendChild(parrafo);
        });

        lista.appendChild(tarjeta);
    });
}

function filtrar() {
    let texto = buscar.value.trim().toLowerCase();
    let opcion = casa.value;

    let resultado = personajes.filter(function(personaje) {

        let datos = (
            (personaje.name || "") + " " +
            (personaje.house || "") + " " +
            (personaje.species || "") + " " +
            (personaje.gender || "") + " " +
            (personaje.actor || "") + " " +
            (personaje.alive ? "Vivo" : "Fallecido")
        ).toLowerCase();

        let coincideTexto = datos.includes(texto);
        let coincideCasa = opcion === "" || personaje.house === opcion;

        return coincideTexto && coincideCasa;
    });

    mostrarDatos(resultado);
}

buscar.addEventListener("input", filtrar);

casa.addEventListener("change", filtrar);

limpiar.addEventListener("click", function() {
    buscar.value = "";
    casa.value = "";
    filtrar();
});

obtenerDatos();
