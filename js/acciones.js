import { acciones } from "./baseDatosAcciones.js";

const searchAction = document.querySelector('#searchAction');
const showaction = document.querySelector('#showAction');
const filtrarSector = document.getElementById('filtrarSector');
const tabla = document.getElementById('miTabla');

const body = tabla.getElementsByTagName("tbody")[0];

let accionABuscar;
let sectorFiltrado;

searchAction.addEventListener('click', async () => {
    accionABuscar = await put();
    // console.log(accionABuscar);    
    const resultado = acciones.find(accion => accion.Simbolo === accionABuscar);

    if (resultado !== undefined) {
        console.log(`La acción se encuentra en nuestro catálogo y el valor es: ${resultado.PrecioMercado}`);
    } else {
        console.log('La acción no se ha encontrado en nuestro catálogo');
    }
});

showaction.addEventListener('click', async () => {
    showCatalog();
});

filtrarSector.addEventListener('click', async () => {
    sectorFiltrado = filtradoResultado();

    const filtrado = acciones.filter(accion => accion.Sector.includes(sectorFiltrado));   
    
    while (body.rows.length > 0) {
        body.deleteRow(0); // Elimina la primera fila en cada iteración hasta que no queden filas
    }

    for (let i = 0; i < filtrado.length; i++) {
        // Crea una nueva fila
        let fila = body.insertRow();

        // Agrega celdas a la fila
        let nombre = fila.insertCell(0);
        let precio = fila.insertCell(1);
        let capitalizacion = fila.insertCell(2);
        // Agrega contenido a las celdas desde el arreglo de datos
        nombre.textContent = filtrado[i].Nombre;
        precio.textContent = filtrado[i].PrecioMercado;
        capitalizacion.textContent = filtrado[i].CapitalizacionBursatil;
        // Agrega más líneas según el número de columnas en tus datos
    }
    console.log(body.rows.length);
    /* setTimeout(function() {
        eliminarFila(0); // Llamada a la función para eliminar la fila
    }, 3000); */

    // Función para eliminar una fila por índice
    
});




function eliminarFila(indice) {

    if (indice >= 0 && indice < body.rows.length) {
        body.deleteRow(indice);
    }
}
const put = async () => {
    let accion;
    document.getElementById('catalogo').innerHTML = '';
    while (true) {
        accion = prompt("Acción desea buscar en nuestro catálogo");

        if (accion !== null && accion.trim() !== '' && isNaN(parseInt(accion))) {
            break;
        }
    }
    return accion;
};

const filtradoResultado = () =>{
    let sectorFiltrar;
    while (true) {
        sectorFiltrar = prompt("Ingrese sector a filtrar : ");

        if (sectorFiltrar !== null && sectorFiltrar.trim() !== '' && isNaN(parseInt(sectorFiltrar))) {
            break;
        }
    }
    return sectorFiltrar;
}


const showCatalog = () => {
    let msj = "";

    acciones.forEach(accion => {
        msj += "<li>Acción: [" + accion.Simbolo +"] - " + accion.Nombre + "</li><br>";
    });

    document.getElementById('catalogo').innerHTML = msj;
};



/* let filtradoEmpresas = filterSector(filtradoResultado);

console.log(filtradoEmpresas); */