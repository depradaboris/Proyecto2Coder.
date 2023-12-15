// Importando el módulo 'acciones' desde el archivo './baseDatosAcciones.js'
import { acciones } from "./baseDatosAcciones.js";

// Obteniendo referencias a elementos del DOM
const searchAction = document.querySelector('#searchAction');
const showaction = document.querySelector('#showAction');
const filtrarSector = document.getElementById('filtrarSector');
const tabla = document.getElementById('miTabla');

// Obteniendo una referencia al cuerpo de la tabla
const body = tabla.getElementsByTagName("tbody")[0];

// Variables para almacenar la acción a buscar y el sector filtrado
let accionABuscar;
let sectorFiltrado;

// Evento de clic para buscar una acción
searchAction.addEventListener('click', async () => {
    accionABuscar = await put(); // Llamando a la función asincrónica put() y esperando su resolución
    const resultado = acciones.find(accion => accion.Simbolo === accionABuscar);

    if (resultado !== undefined) {
        console.log(`La acción se encuentra en nuestro catálogo y el valor es: ${resultado.PrecioMercado}`);
    } else {
        console.log('La acción no se ha encontrado en nuestro catálogo');
    }
});

// Evento de clic para mostrar el catálogo de acciones
showaction.addEventListener('click', async () => {
    showCatalog(); // Llamando a la función showCatalog()
});

// Evento de clic para filtrar acciones por sector
filtrarSector.addEventListener('click', async () => {
    sectorFiltrado = filtradoResultado(); // Llamando a la función filtradoResultado()

    const filtrado = acciones.filter(accion => accion.Sector.includes(sectorFiltrado));

    // Eliminando filas existentes en la tabla
    while (body.rows.length > 0) {
        body.deleteRow(0);
    }

    // Agregando filas a la tabla con datos filtrados
    for (let i = 0; i < filtrado.length; i++) {
        let fila = body.insertRow();

        let nombre = fila.insertCell(0);
        let precio = fila.insertCell(1);
        let capitalizacion = fila.insertCell(2);

        nombre.textContent = filtrado[i].Nombre;
        precio.textContent = filtrado[i].PrecioMercado;
        capitalizacion.textContent = filtrado[i].CapitalizacionBursatil;
    }
});

// Función asincrónica para obtener la acción a buscar desde el usuario
const put = async () => {
    let accion;
    document.getElementById('catalogo').innerHTML = '';

    // Ciclo para obtener una acción válida (no nula, no vacía y no numérica)
    while (true) {
        accion = prompt("Acción desea buscar en nuestro catálogo");

        if (accion !== null && accion.trim() !== '' && isNaN(parseInt(accion))) {
            break;
        }
    }
    return accion;
};

// Función para obtener el sector a filtrar desde el usuario
const filtradoResultado = () => {
    let sectorFiltrar;

    // Ciclo para obtener un sector válido (no nulo, no vacío y no numérico)
    while (true) {
        sectorFiltrar = prompt("Ingrese sector a filtrar : ");

        if (sectorFiltrar !== null && sectorFiltrar.trim() !== '' && isNaN(parseInt(sectorFiltrar))) {
            break;
        }
    }
    return sectorFiltrar;
}

// Función para mostrar el catálogo de acciones en un elemento HTML
const showCatalog = () => {
    let msj = "";

    // Creando una cadena con información de cada acción en el catálogo
    acciones.forEach(accion => {
        msj += "<li>Acción: [" + accion.Simbolo + "] - " + accion.Nombre + "</li><br>";
    });

    // Insertando la cadena en el elemento con id 'catalogo'
    document.getElementById('catalogo').innerHTML = msj;
};