/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Plantilla.jugadoresCurling = {
    id: "undefined",
    nombre_jugador: "undefined",
    fecha_nacimiento: "undefined",
    participacion_juegos_olimpicos: "undefined",
    equipo: "undefined",
    categorias_jugadas: "undefined",
    victorias: "undefined",
    derrotas: "undefined"
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


/*
   Aqui vamos a implementar las funciones necesarias para la segunda historia de usuario
   Queremos imprimer por pantalla los nombres de los jugadores
 */

/**
 * @brief Creare la tabla para la primera Historia de Usuario, enseñaremos los nombres de los jugadores de nuestra base
 *        de datos
 * @constructor creamos la tabla que veremos en la pagina
 */
Plantilla.TablaNombres = {}
Plantilla.CabeceraJugadores = function() {
    return `<table> 
        <thead>
            <th>Nombre</th>                                    
        </thead>
        `
}

Plantilla.CuerpoJugadores = function (_curling) {
    const curling = _curling.data
    return `<tbody>
            <tr title="Cuerpo Jugadores">
                <td>${curling.nombre_jugador}</td>
            </tr>
            </tbody>
            </table>`;
}

/**
 * En esta función solo se mostrara los nombres de los jugadores de nuestra base de datos
 */

Plantilla.Nombres_Jugadores = function (vector){
    let x = "";
     x += Plantilla.CabeceraNombre
    //Miramos que lo que se esta pasando por entrada es una funcion
    //Añadimos el contenido del cuerpo
     vector.forEach(e => x += Plantilla.CuerpoJugadores(e))
     Frontend.Article.actualizar("Son los nombres de los jugadores del deporte Curling",x)
}

/**
 * @param Recupera los datos de jugadores de la plantilla creada
 * @param callbackFn
 * @returns {Promise<void>}
 */
Plantilla.recupera = async function (callbackFn){
    let response = null
    try{
        const url = Frontend.API_GATEWAY + "/plantilla/getJugadores"
        response = await fetch(url)
    }catch( error){
        alert("Error: No se puede acceder al Api-gateway")
        console.error(error)
    }
    let Jugadores_Curling = null
    if (response){
        Jugadores_Curling = await response.json()
        callbackFn(Jugadores_Curling.data)
    }
}

/**
 * @brief añadir los nombres de la plantilla que se han obtenido desde la funcion nombres_jugadores
 */
Plantilla.listarNombresCurling = function(){
    Plantilla.recupera(Plantilla.Nombres_Jugadores);
}



