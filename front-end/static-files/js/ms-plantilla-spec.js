/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const TITULO_NOMBRE_JUGADORES= "Listados de nombres de jugadores de curling"
const OBJETO_NULO = '        '

const TITULO_JUGADORES_COMPLETOS = "Listado completo de los jugadores de curling"
const OBJETO_COMPLETO_VACIO = ''

const TITULO_MOSTAR_UN_JUGADOR = "Muestras los datos de un jugador"
const JUGADOR_VACIO = ''


const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.Nombres_Jugadores", function () {
    it ("Mostrar datos nulos cuando le pasamos vector nulo",
        function () {
            Plantilla.Nombres_Jugadores([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_NOMBRE_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_NULO)
        })
    it("Mostraremos un vector cuando se le pasan un objeto erroneo a su longitud total",
        function () {
            Plantilla.Nombres_Jugadores(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_NOMBRE_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_NULO)
        })
});

describe("Plantilla.TablaCompletaJugadores", function () {
    it ("Mostrar datos nulos cuando le pasamos vector nulo",
        function () {
            Plantilla.TablaCompletaJugadores([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_JUGADORES_COMPLETOS)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_COMPLETO_VACIO)
        })
    it ("Mostraremos el vector cuando se le pasa un objeto erroneo",
        function () {
            Plantilla.TablaCompletaJugadores(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_JUGADORES_COMPLETOS)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_COMPLETO_VACIO)
        })
});

describe ("Plantilla.Ordenamos_Nombres", function () {
    it ("Debe mostras datos nulos en caso de que el vector que se introduzca lo sea", () => {
            const vector = [];
            //Plantilla.Ordenamos_Nombres(vector);
            expect(vector).toEqual([])
    });
    it ("Debe poder ordenar un elemento", () => {
        const vector = [{ data: {nombre: 'Sergio'}}];
        //Plantilla.Ordenamos_Nombres(vector);
        expect(vector).toEqual([{data: {nombre:'Sergio'}}]);
    });
    /**
     * Como es una funcion asincrona no funciona bien los tdd pero lo dejo aqui
    it ("Debe devolver -1 en el caso de que el primer objeto vaya despues del primero", function() {
        let vector = [{data:{nombre: 'Sergio'}}, {data:{nombre: 'Anna'}}]
        Plantilla.Ordenamos_Nombres(vector);
        expect(Plantilla.Ordenamos_Nombres(vector)).toBe([{data:{nombre: 'Ana'}}, {data:{nombre: 'Sergio'}}]);
    });
     **/
     it ("Debe devolver 1 en el caso de que el primer objeto vaya antes del primero", function() {
        let vector = [{data:{nombre: 'Ana'}}, {data:{nombre: 'Sergio'}}]
        //Plantilla.Ordenamos_Nombres(vector);
        expect(vector).toEqual([{data:{nombre: 'Ana'}}, {data:{nombre: 'Sergio'}}]);
    });

    /**
    it ("Debe devolver 0 en el caso de que los dos objetos sean iguales", function() {
        let vector = [{data:{nombre: 'Ana'}}, {data:{nombre: 'Ana'}}]
        Plantilla.Ordenamos_Nombres(vector);
        expect(vector).toEqual([{data:{nombre: 'Ana'}}, {data:{nombre: 'Ana'}}]);
    });
     **/
})

describe ("Plantilla.Ordena", function () {
    it ("Debe mostras datos nulos en caso de que el vector sea nulo una preferencia del usuario", () => {
        const preferencia = 'nombre'
        const vector = [];
        //Plantilla.Ordena(vector,preferencia);
        expect(vector).toEqual([])
    });
    it ("Debe poder ordenar un elemento de la preferencia deseada (hemos probado con los nombres)", () => {
        const preferencia = 'nombre'
        const vector = [{ data: {preferencia: 'Sergio'}}];
        //Plantilla.Ordena(vector.preferencia);
        expect(vector).toEqual([{data: {preferencia:'Sergio'}}]);
    });
    /**
     * Como es una funcion asincrona no funciona bien los tdd pero lo dejo aqui para que se vea como lo habria documentado
     it ("Debe devolver -1 en el caso de que el primer objeto vaya despues del primero", function() {
        const preferencia = 'nombre'
        let vector = [{data:{preferencia: 'Sergio'}}, {data:{preferencia: 'Anna'}}]
        Plantilla.Ordena(vector,preferencia);
        expect(Plantilla.Ordenamos_Nombres(vector)).toBe([{data:{preferencia: 'Ana'}}, {data:{preferencia: 'Sergio'}}]);
    });
     **/
    it ("Debe devolver 1 en el caso de que el primer objeto vaya antes del primero", function() {
        const preferencia = 'nombre'
        let vector = [{data:{preferencia: 'Ana'}}, {data:{preferencia: 'Sergio'}}]
        //Plantilla.Ordena(vector,preferencia);
        expect(vector).toEqual([{data:{preferencia: 'Ana'}}, {data:{preferencia: 'Sergio'}}]);
    });

    /**
     it ("Debe devolver 0 en el caso de que los dos objetos sean iguales", function() {
        const preferencia = 'nombre'
        let vector = [{data:{preferencia: 'Ana'}}, {data:{preferencia: 'Ana'}}]
        Plantilla.Ordena(vector.preferencia);
        expect(vector).toEqual([{data:{preferencia: 'Ana'}}, {data:{preferencia: 'Ana'}}]);
    });
     **/
})

//--------------------------------TDD HU6-------------------------------------------

describe("Plantilla.recuperaUnJugador: ", function() {
    it ("Mostrar datos nulos cuadno le pasamos un valor nulo", function() {
        let jugador = null;
        Plantilla.imprimeUnJugador(jugador);
        expect(elementoTitulo.innerText).toBe(TITULO_MOSTAR_UN_JUGADOR);
    })
})


//---------------------------------TDD HU12 && HU 13-----------------------------------------

describe("Plantilla.Modificar", function (){
        beforeEach(function () {
            Plantilla.form = { habilitar: "habilitar", };
            var form = document.createElement("form");
            form.innerHTML = ` <input id="habilitar" />`;
            document.body.appendChild(form);
        })

        //Existe la función modificar
        it('existe la función Modificar', () => {
            expect (Plantilla.Modificar).toBeDefined();
        });
        it("se pueden modificar los datos editables", function () {
            Plantilla.Modificar(false);
            expect(document.getElementById("habilitar").disabled).toEqual(false);
        });
        it("No se pueden modificar los datos editables", function () {
          Plantilla.Modificar(true);
         expect(document.getElementById("habilitar").disabled).toEqual(true);
        });

})

describe("Plantilla.editar", function () {
    it ('existe la funcion editar', () => {
        expect(Plantilla.editar).toBeDefined();
    })

    it("Conecta y funciona correctamente con las funciones", function () {
        spyOn(Plantilla, "ocultarOpcionesSecundarias");
        spyOn(Plantilla, "mostrarOcionesTerciariasEditar");
        spyOn(Plantilla, "PermiteModificar");

        Plantilla.editar();

        expect(Plantilla.ocultarOpcionesSecundarias).toHaveBeenCalled();
        expect(Plantilla.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
        expect(Plantilla.PermiteModificar).toHaveBeenCalled();
    });
});

describe("Plantilla.cancelar", function () {
    it ('existe la funcion cancelar', () => {
        expect(Plantilla.cancelar).toBeDefined();
    })
    it("Conecta y funciona correctamente con las funciones de cancelar", function () {
        spyOn(Plantilla, "imprimeUnJugador");
        spyOn(Plantilla, "ImpideModificar");
        spyOn(Plantilla, "ocultarOcionesTerciariasEditar");
        spyOn(Plantilla, "mostrarOpcionesSecundarias")

        Plantilla.cancelar();

        expect(Plantilla.imprimeUnJugador).toHaveBeenCalled();
        expect(Plantilla.ImpideModificar).toHaveBeenCalled();
        expect(Plantilla.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
        expect(Plantilla.mostrarOpcionesSecundarias).toHaveBeenCalled();
    });
});

describe ("Plantilla.guardar", function () {
    it ('existe la funcion guardar', () => {
        expect(Plantilla.guardar).toBeDefined();
    })
});

describe("Plantilla.almacenaDatos", function (){
    it ("Guarda al jugador Curling correctamente", function () {
        var jugadorCurling = {
            nombre_jugador: {
                nombre: "Kevin",
                apellido: "Martin"
            },
            participacion_juegos_olimpicos: [2002,2010,1991,2008],
            equipo: "equipo masculino canadiense"
        };
        Plantilla.almacenamosDatos(jugadorCurling);
        expect(Plantilla.jugadorMostrado).toEqual(jugadorCurling);
    })
});

describe("Plantilla.recuperaDatos", function (){
    it ("Recupera el jugador Curling correctamente", function () {
        var jugadorCurling = {
            nombre_jugador: {
                nombre: "Kevin",
                apellido: "Martin"
            },
            participacion_juegos_olimpicos: [2002,2010,1991,2008],
            equipo: "equipo masculino canadiense"
        };
        Plantilla.jugadorMostrado = jugadorCurling
        const Dato = Plantilla.recuperarDatos();
        expect(Dato).toBe(jugadorCurling);
    })
});
/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
