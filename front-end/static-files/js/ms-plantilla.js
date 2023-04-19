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

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE_COMPLETO": "### NOMBRE_COMPLETO ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "PARTICIPACION_JUEGOS_OLIMPICOS": "### PARTICIPACION_JUEGOS_OLIMPICOS ###",
    "EQUIPO": "### EQUIPO ###",
    "CATEGORIAS_JUGADAS": "### CATEGORIAS_JUGADAS ###",
    "VICTORIAS": "### VICTORIAS ###",
    "DERROTAS": "### DERROTAS ###"
}


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
Plantilla.TablaNombres.CabeceraJugadores =
     `<table> 
        <thead>           
            <th>NOMBRE</th>
            <th>APELLIDO</th>                                  
        </thead>
            <tbody>`;
Plantilla.TablaNombres.CuerpoJugadores = `<tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td>${Plantilla.plantillaTags.NOMBRE}</td>
                <td>${Plantilla.plantillaTags.APELLIDO}</td>
            </tr>`;
Plantilla.TablaNombres.pie = `        </tbody>
</table>
`;

Plantilla.TablaNombres.actualiza = function (curling) {
    return Plantilla.sustituyeTagsCompletos(this.CuerpoJugadores, curling)
}



Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    //mostrar todos los jinetes que se han descargado
    let vector = null
    if (response) {
        vector = await response.json()
        callBackFn(vector.data)
    }
}

Plantilla.Nombres_Jugadores = function (vector){
    let msj = Plantilla.TablaNombres.CabeceraJugadores
    vector.forEach(e => msj += Plantilla.TablaNombres.actualiza(e))
    msj += Plantilla.TablaNombres.pie

    // Borrar toda la información de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listados de nombres de jugadores de curling" , msj)
}

Plantilla.listarNombresCurling = function(){
    Plantilla.recupera(Plantilla.Nombres_Jugadores);
}

//-------------------------------
//Cuarta Historia de Usuario

Plantilla.TablaCompleta = {}
Plantilla.TablaCompleta.CabeceraCompleta =`
    <table>
       <thead>
           <th>Nombre</th>
           <th>Apellido</th>
           <th>Fecha_Nacimiento</th>
           <th>Participacion Juegos Olimpicos</th>
           <th>Equipo</th>
           <th>Categorias Jugadas</th>
           <th>Victorias</th>
           <th>Derrotas</th> 
        </thead>
       <tbody>`;
Plantilla.TablaCompleta.CuerpoCompleto = `<tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td>${Plantilla.plantillaTags.NOMBRE}</td>
                <td>${Plantilla.plantillaTags.APELLIDO}</td>
                <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
                <td>${Plantilla.plantillaTags.PARTICIPACION_JUEGOS_OLIMPICOS}</td>
                <td>${Plantilla.plantillaTags.EQUIPO}</td>
                <td>${Plantilla.plantillaTags.CATEGORIAS_JUGADAS}</td>
                <td>${Plantilla.plantillaTags.VICTORIAS}</td>
                <td>${Plantilla.plantillaTags.DERROTAS}</td>
            </tr>`;
Plantilla.TablaCompleta.pieC =  `</tbody> </table>`;

Plantilla.sustituyeTagsCompletos = function (plantilla_, jugador_Cu) {
    return plantilla_
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), jugador_Cu.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE  , 'g'), jugador_Cu.data.nombre_jugador.nombre )
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO  , 'g'), jugador_Cu.data.nombre_jugador.apellido )
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NACIMIENTO, 'g'), jugador_Cu.data.fecha_nacimiento.dia + "/" + jugador_Cu.data.fecha_nacimiento.mes )
        .replace(new RegExp(Plantilla.plantillaTags.PARTICIPACION_JUEGOS_OLIMPICOS, 'g'), jugador_Cu.data.participacion_juegos_olimpicos)
        .replace(new RegExp(Plantilla.plantillaTags.EQUIPO, 'g'), jugador_Cu.data.equipo)
        .replace(new RegExp(Plantilla.plantillaTags.CATEGORIAS_JUGADAS, 'g'), jugador_Cu.data.categorias_jugadas)
        .replace(new RegExp(Plantilla.plantillaTags.VICTORIAS, 'g'), jugador_Cu.data.victorias)
        .replace(new RegExp(Plantilla.plantillaTags.DERROTAS, 'g'), jugador_Cu.data.derrotas)
}
Plantilla.TablaCompleta.actualiza_2 = function (curling) {
    return Plantilla.sustituyeTagsCompletos(this.CuerpoCompleto, curling)
}

Plantilla.TablaCompletaJugadores = function (vec_4){
    let x = Plantilla.TablaCompleta.CabeceraCompleta
    vec_4.forEach(e => x += Plantilla.TablaCompleta.actualiza_2(e))
    x += Plantilla.TablaCompleta.pieC
    Frontend.Article.actualizar("Listados de nombres de jugadores de curling" , x)
}

Plantilla.listadoCompleto = function (){
    Plantilla.recupera(Plantilla.TablaCompletaJugadores);
}
