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
    "APELLIDO": "### APELLIDO ###"
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


Plantilla.sustituyeTags = function (plantilla, jugador_C) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE  , 'g'), jugador_C.data.nombre_jugador.nombre )
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO  , 'g'), jugador_C.data.nombre_jugador.apellido )
}
Plantilla.TablaNombres.actualiza = function (curling) {
    return Plantilla.sustituyeTags(this.CuerpoJugadores, curling)
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

Plantilla.CabeceraCompleta = function () {
    return `
    <table>
       <thead>
           <th>Nombre_Jugador</th>
           <th>Fecha_Nacimiento</th>
           <th>Participacion Juegos Olimpicos</th>
           <th>Equipo</th>
           <th>Categorias Jugadas</th>
           <th>Victorias</th>
           <th>Derrotas</th> 
        </thead>
       <tbody>`;
}

Plantilla.CuepoCompleto = function (q) {
    const curling = q.data;

    const Nombre_Jugador = curling.nombre;
    const Fecha_Nacimiento = curling.fecha_nacimiento;
    const Participacion = curling.participacion_juegos_olimpicos;
    const Equipo = curling.equipo;
    const Categorias = curling.categorias_jugadas;
    const Victorias = curling.victorias;
    const Derrotas = curling.derrotas;

    return `<tr title="${curling.ref['@ref'].id}">
                <td>${Nombre_Jugador}</td>
                <td>${Fecha_Nacimiento}</td>
                <td>${Participacion}</td>
                <td>${Equipo}</td>
                <td>${Categorias}</td>
                <td>${Victorias}</td>
                <td>${Derrotas}</td>
            </tr>
            `;
}

Plantilla.pieTabla = function (){
    return `</tbody> </table>`;
}

Plantilla.TablaCompleta = function (vec_4){
    let x = "";
    x += Plantilla.CabeceraCompleta();
    if (vec_4 && Array.isArray(vec_4)) {
        vec_4.forEach(i => x += Plantilla.CuepoCompleto(i));
    }
    x += Plantilla.pieTabla();
    Frontend.Article.actualizar("Jugadores al completo", x);
}

Plantilla.listadoCompleto = function (){
    this.recupera(this.TablaCompleta);
}
