/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"

Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_NO_MOSTRAR = "borrar"
/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    titulo = titulo || ""
    contenido = contenido || ""
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}

Frontend.Article.borrarTitulo = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = "";
    return this;
}
Frontend.Article.borrarContenido = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = "";
    return this;
}
Frontend.Article.borrar = function () {
    return this.borrarTitulo().borrarContenido();
}

Frontend.Article.sumarTitulo = function (texto) {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML += "\n" + texto;
    return this;
}
Frontend.Article.sumarContenido = function (texto) {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML += "\n" +texto;
    return this;
}
Frontend.Article.aniadirClase = function(elemento,nombreClase){
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase.split("   ")
        .filter(e => e)
        .filter(e => e != nombreClase)
        .concat(nombreClase)
        .join(" ")
    elemento.setAttribute("class",clase)

    return this;
}
Frontend.Article.borrarClase = function(elemento,nombreClase){
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase.split( "   ")
        .filter(e => e)
        .filter(e => e != nombreClase)
        .join(" ")
    elemento.setAttribute("class",clase)

    return this;
}

Frontend.Article.mostrar = function(){
    let article = document.getElementById(Frontend.ID_SECCION_PRINCIPAL);
    Frontend.borrarClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_NO_MOSTRAR)
        .aniadirClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_MOSTRAR)

}

Frontend.Article.actualizarBoton = function (titulo, contenido) {
    this.borrar()
        .sumarTitulo(titulo)
        .sumarContenido(contenido)
        .mostrar()
    return this;
}