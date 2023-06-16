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
     `<table width="100%" class="Estilo_Nombres"> 
        <thead>           
            <th>NOMBRE</th>
            <th>APELLIDO</th>   
            <th>BOTON</th>                               
        </thead>
            <tbody>`;
Plantilla.TablaNombres.CuerpoJugadores = `
            <tr title="${Plantilla.plantillaTags.ID}">
                <td>${Plantilla.plantillaTags.NOMBRE}</td>
                <td>${Plantilla.plantillaTags.APELLIDO}</td>
                 <td><div><a href="javascript:Plantilla.mostrarUnJugador('${Plantilla.plantillaTags.ID}')"
                            class="opcion-secundaria mostrar">Mostrar</a>
                     
                    </div>
                </td>
            </tr>`;
Plantilla.TablaNombres.pie = `        </tbody>
</table>
`;

Plantilla.sustituyeTags = function (plantilla_, jugador_Cu) {
    return plantilla_
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), jugador_Cu.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), jugador_Cu.data.nombre_jugador.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO, 'g'), jugador_Cu.data.nombre_jugador.apellido)
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

    let vector = null
    if (response) {
        vector = await response.json()
        callBackFn(vector.data)
    }
}

/***
 * @param vector
 * @constructor
 */
Plantilla.Nombres_Jugadores = function (vector){
    let msj = Plantilla.TablaNombres.CabeceraJugadores
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.TablaNombres.actualiza(e))
    }
    msj += Plantilla.TablaNombres.pie
    Frontend.Article.actualizar("Listados de nombres de jugadores de curling" , msj)
}

Plantilla.listarNombresCurling = function(){
    Plantilla.recupera(Plantilla.Nombres_Jugadores);
}

//-------------------------------
//Cuarta Historia de Usuario

Plantilla.TablaCompleta = {}
Plantilla.TablaCompleta.CabeceraCompleta =`
    <table class ="Estilo_Completo">
       <thead>
           <th>Nombre</th>
           <th>Apellido</th>
           <th>Fecha_Nacimiento</th>
           <th>Participacion Juegos Olimpicos</th>
           <th>Equipo</th>
           <th>Categorias Jugadas</th>
           <th>Victorias</th>
           <th>Derrotas</th> 
           <th>Boton</th>
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
                <td>
                    <div><a href="javascript:Plantilla.mostrar()" class="opcion-secundaria mostrar">Mostrar</a></div></td>
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

/***
 * @param vec_4
 * @constructor
 */
Plantilla.TablaCompletaJugadores = function (vec_4){
    let x = Plantilla.TablaCompleta.CabeceraCompleta
    if (vec_4 && Array.isArray(vec_4)){
         vec_4.forEach(e => x += Plantilla.TablaCompleta.actualiza_2(e))
    }
    x += Plantilla.TablaCompleta.pieC
    Frontend.Article.actualizar("Listado completo de los jugadores de curling" , x)
}

Plantilla.listadoCompleto = function (){
    Plantilla.recupera(Plantilla.TablaCompletaJugadores);
}

//-------------------------------------------------
//---------Historia de usuario 3-------------------


Plantilla.Ordenamos_Nombres = async function (callbackFn){
    let response = null;
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    let nombre_Curling = null;
    if (response){
        nombre_Curling = await response.json()
        nombre_Curling.data.sort((a,b)=>{
            //Devuelve -1 si el a esta despues del b
            if (a.data.nombre_jugador.nombre < b.data.nombre_jugador.nombre){
                return -1;
            }
            //Devuelve 1 si el a esta antes que el b
            if (a.data.nombre_jugador.nombre > b.data.nombre_jugador.nombre){
                return 1;
            }
            //Devuelve 0 si son iguales
            return 0;
        });
    callbackFn(nombre_Curling.data)
    }
}

Plantilla.listaOrdenada = function(){
    Plantilla.Ordenamos_Nombres(Plantilla.Nombres_Jugadores);
}

//----------------------------------------------------------
//-------------HISTORIA DE USUARIO 5------------------------

Plantilla.Ordena = async function (callbackFn, preferencia) {
    let response = null;
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    let vector_objetos = null;
    if (response) {
        vector_objetos = await response.json()
        if (preferencia == 'nombre') {
            vector_objetos.data.sort((a, b) => {
                if (a.data.nombre_jugador.nombre < b.data.nombre_jugador.nombre) {
                    return -1;
                }
                if (a.data.nombre_jugador.nombre > b.data.nombre_jugador.nombre) {
                    return 1;
                }
                return 0;
            });
        }
        if (preferencia == 'apellido'){
            vector_objetos.data.sort((a, b) => {
                if (a.data.nombre_jugador.apellido < b.data.nombre_jugador.apellido) {
                    return -1;
                }
                if (a.data.nombre_jugador.apellido > b.data.nombre_jugador.apellido) {
                    return 1;
                }
                return 0;
            });
        }
        if (preferencia == 'fecha_nacimiento'){
            vector_objetos.data.sort((a, b) => {
                if (a.data.fecha_nacimiento.dia != b.data.fecha_nacimiento.dia){
                    return a.data.fecha_nacimiento.dia - b.data.fecha_nacimiento.dia;
                } if (a.data.fecha_nacimiento.dia == b.data.fecha_nacimiento.dia){
                    if (a.data.fecha_nacimiento.mes != b.data.fecha_nacimiento.mes){
                        return a.data.fecha_nacimiento.mes - b.data.fecha_nacimiento.mes;
                    }
                }
            });
        }
        if (preferencia == 'categorias_jugadas'){
            vector_objetos.data.sort((a, b) => {
                if (a.data.categorias_jugadas < b.data.categorias_jugadas) {
                    return -1;
                }
                if (a.data.categorias_jugadas> b.data.categorias_jugadas) {
                    return 1;
                }
                return 0;
            });
        }
        if (preferencia == 'victorias'){
            vector_objetos.data.sort((a, b) => {
                return a.data.victorias - b.data.victorias;
            });
        }
        if (preferencia == 'derrotas'){
            vector_objetos.data.sort((a, b) => {
                return a.data.derrotas - b.data.derrotas;
            });
        }
        callbackFn(vector_objetos.data)
    }
}

Plantilla.listaOrdenadaC = function(preferencia){
    Plantilla.Ordena(Plantilla.TablaCompletaJugadores, preferencia);
}

//------------------------------------------------------
//-------------Historia Usuario 6-----------------------
Plantilla.jugadorMostrado = null
Plantilla.formulario_form = {
    ID: "form-jugador-id",
    NOMBRE: "form-jugador-nombre",
    APELLIDOS: "form-jugador-apellido",
    FECHA_NACIMIENTO: "form-jugador-fecha_nacimiento",
    PARTICIPACION_JUEGOS_OLIMPICOS: "form-jugador-participacion_juegos_olimpicos",
    EQUIPO: "form-jugador-equipo",
    CATEGORIAS_JUGADAS: "form-jugador-categorias_jugadas",
    VICTORIAS: "form-jugador-victorias",
    DERROTAS: "form-jugador-derrotas"
}
Plantilla.plantillaFormularioJugadorCurling = {}
Plantilla.plantillaFormularioJugadorCurling.formulario = `
<form method='post' action=''> <table  class="listado_jugadores">
    <thead>
        <th>ID</th>
        <th>NOMBRE</th>
        <th>APELLIDO</th>
        <th>FECHA_NACIMIENTO</th>      
        <th>PARTICIPACION JUEGOS OLIMPICOS</th>
        <th>EQUIPO</th>
        <th>CATEGORIAS_JUGADAS</th>
        <th>VICTORIAS</th>
        <th>DERROTAS</th>
    </thead>
    <tbody>
        <tr title="${Plantilla.plantillaTags.ID}">
            <td><input type="text" class="form-jugador-elemento disabled" disabled id="form-jugdor-id" required value="${Plantilla.plantillaTags.ID}" name="id_jugador"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" name="nombre_jugador"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-apellidos" required value="${Plantilla.plantillaTags.APELLIDOS}" name="apellidos_JUGADOR"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-fecha_nacimiento" required value="${Plantilla.plantillaTags.FECHA_NACIMIENTO}" name="fecha_nacimiento_jugador"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-participacion_juegos_olimpicos" required value="${Plantilla.plantillaTags.PARTICIPACION_JUEGOS_OLIMPICOS}" name="participacion_juegos_olimpicos"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-equipo" required value="${Plantilla.plantillaTags.EQUIPO}" name="equipo"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-categorias_jugadas" required value="${Plantilla.plantillaTags.CATEGORIAS_JUGADAS}" name="categorias_jugadas"/></td>
            <td><input type="text" class="form-jugadorelemento editable" disabled id="form-jugador-victorias required value="${Plantilla.plantillaTags.VICTORIAS}" name="victorias"/></td>
            <td><input type="text" class="form-jugador-elemento editable" disabled id="form-jugador-derrotas" required value="${Plantilla.plantillaTags.DERROTAS}" name="derrotas"/></td>
        </tr>
    </tbody>
</table>
</form>`;

Plantilla.recuperaUnJugador = async function (idJugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idJugador
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

Plantilla.plantillaFormularioJugadorCurling.actualiza_3 = function (jugador) {
    return Plantilla.sustituyeTags(this.formulario, jugador);
}
Plantilla.JugadorCurlingComoFormulario = function (jugador) {
    return Plantilla.plantillaFormularioJugadorCurling.actualiza_3( jugador );
}
Plantilla.imprimeUnJugador = function (jugador) {
    let msj = Plantilla.JugadorCurlingComoFormulario(jugador);
    Frontend.Article.actualizarBoton("Mostrar datos de un jugador", msj)
    Plantilla.almacenaJugadorCurling(jugador)
}
Plantilla.almacenaJugadorCurling = function (jugador) {
    Plantilla.jugadorMostrado = jugador;
}
Plantilla.mostrar = function (idJugador) {
    this.recuperaUnJugador(idJugador, this.imprimeUnJugador);
}
Plantilla.jugadorComoTabla = function (jugador) {
    return Plantilla.TablaNombres.CabeceraJugadores
        + Plantilla.TablaNombres.actualiza(jugador)
        + Plantilla.TablaNombres.pie;
}

//--------------------------------------------------
//------------------Historia de Usuario 13-----------

Plantilla.PermiteModificar = function (permiso){
    permiso = (typeof permiso === "undefined" || permiso === null)?true : permiso
    for (let nombre in Plantilla.form){
        document.getElementById(Plantilla.form(nombre)).disabled = permiso
    }
    return this
}

Plantilla.ImpideModificar = function (){
    Plantilla.PermiteModificar(true)
    return this
}
Plantilla.PermiteModificar = function(){
    Plantilla.PermiteModificar(false)
    return this
}

Plantilla.opcionesAMostrar = function (classname, mostrar){
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrar ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseSumar = mostrar ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    for (let i = 0; i < opciones.length; i++){
        Frontend.borrar(opciones[i], claseQuitar).sumarTitulo(opciones[i],claseSumar)
    }
    return this
}

Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesAMostrar("opcion-secundaria", false)
    return this
}
Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesAMostrar("opcion-secundaria", true)
    return this
}
Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesAMostrar("opcion-terciaria editar", true)
    return this
}
Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesAMostrar("opcion-terciaria editar", false)
    return this
}

Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.PermiteModificar()
}
Plantilla.cancelar = function () {
    this.almacenaJugadorCurling(this.recuperarDatos ())
    this.ImpideModificar()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}
Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
        let id_Curling = document.getElementById("form-jugador-id").value
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
                "id_jugador": id_Curling,
                "nombre_jugador": document.getElementById("form-jugador-nombre").value,
                "apellidos_jugador": document.getElementById("form-jugador-apellidos").value,
                "f_nac_deportista": document.getElementById("form-deportista-fecha_nacimiento").value,
                "participacion_juegos_olimpicos": document.getElementById("form-jugador-participacion_juegos_olimpicos").value,
                "equipo": document.getElementById("form-jugador-equipo").value,
                "categorias_jugadas": document.getElementById("form-jugador-categorias_jugadas").value,
                "victorias": document.getElementById("form-jugador-victorias").value,
                "derrotas": document.getElementById("form-jugador-derrotas").value,
            }),
        })
        Plantilla.mostrar(id_Curling)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
    }
}
Plantilla.recuperarDatos = function () {
    return this.jugadorMostrado;
}

