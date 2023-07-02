/**
 * @file callbacks.js
 * @description Callbacks para el MS Plantilla.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAFG5RIulAAzA6IJ3L-SxbEqz0PPNFlhfenjjGA',
});

const COLLECTION = "Curling"


// Necesario para conectar a la BBDD faunadb
/*
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});

const COLLECTION = "Personas"
*/
// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
    /**
     * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            if( personas) CORS(res).status(200).json(personas)
        } catch (error) {
            res.status(500).json({error: error.description})
        }
    },
    getTodos: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )

            if( personas ) CORS(res).status(200).json(personas)
        }
         catch (error) {
            CORS(res).status(500).json({error: error.description})
        }
    },
    setTodos: async (req, res) => {
        try {
            let valor = {}
            let data = (Object.values(req.body)[0] === '') ? JSON.parse(Object.keys(req.body)[0]) : req.body
            let jugadores = await client.query(
                q.Update(
                    q.Ref(q.Collection(COLLECTION), data.idCurling),
                    {
                        data: {
                            nombre: data.nombre_jugador.nombre,
                            apellido: data.nombre_jugador.apellido,
                            fecha_nacimiento: data.fecha_nacimiento,
                            participacion_juegos_olimpicos: data.participacion_juegos_olimpicos,
                            equipo: data.equipo,
                            categorias_jugadas: data.categorias_jugadas,
                            victorias: data.victorias,
                            derrotas: data.derrotas
                        },
                    },
                )
            )
                .then((ret) => {
                    valor = ret
                    CORS(res).status(200).header('Content-Type', 'application/json').json(valor)
                })

        } catch (error) {
            CORS(res).status(500).json({error: error.description})
        }
    },
    getPorId: async (req, res) => {
        try {
            let jugador = await client.query(
                q.Get(q.Ref(q.Collection(COLLECTION), req.params.idCurling))
            )

            if( jugador ) 
                CORS(res)
                .status(200)
                .json(jugador)

        } catch (error) {
            CORS(res).status(500).json({error: error.description})
        }
    },


}


// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            CORS(res).status(200).json({mensaje: "Microservicio MS Plantilla: home"});
        } catch (error) {
            CORS(res).status(500).json({error: error.description})
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            CORS(res).status(200).json({
                mensaje: "Microservicio MS Plantilla: acerca de",
                autor: "Magdalena Bueno Pedrera",
                email: "mmbp0003@red.ujaen.es",
                fecha: "19/01/2001"
            });
        } catch (error) {
            CORS(res).status(500).json({error: error.description})
        }
    },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = {...CB_MODEL_SELECTS, ...CB_OTHERS}
