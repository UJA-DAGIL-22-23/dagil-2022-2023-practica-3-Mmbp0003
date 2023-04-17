[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10572243&assignment_repo_type=AssignmentRepo)

#Base de datos de mi programa

En primer lugar voy a presentar la base de datos que va a conformar mi trabajo sobre el curling.
Para ello voy a dejar los documentos correspondiente de cada uno de los jugadores y las capturas correspondientes a esta nueva base de datos.

![Fauna antes de hacer los documentos](./assets/img/Base_de_datos_C1.png)
*Captura de Fauna antes de realizar los documentos.* &#8593;

![Captura de los diez documentos creado](./assets/img/Base_datos_C2.png)
*Captura de los diez documentos creados.* &#8593;

##Primer documento

```
{
"nombre_jugador": {
"nombre": "Sergio",
"apellido": "Vez"
},
"fecha_nacimiento": {
"dia": 13,
"mes": 5,
"año": 1994
},
"participacion_juegos_olimpicos": [2014, 2018, 2009],
"equipo": "equipo masculino español",
"categorias_jugadas": "Mixto",
"victorias": 2,
"derrotas": 1
}

```

##Segundo documento
```
{
  nombre_jugador: {
    nombre: "Kevin",
    apellido: "Martin"
  },
  fecha_nacimiento: {
    dia: 31,
    mes: 7,
    año: 1966
  },
  participacion_juegos_olimpicos: [2002, 2010, 1991, 2008],
  equipo: "equipo masculino canadiense",
  categorias_jugadas: "masculino",
  victorias: 2,
  derrotas: 2
}
```

##Tercer documento
```
{
  nombre_jugador: {
    nombre: "Jennifer",
    apellido: "Jones"
  },
  fecha_nacimiento: {
    dia: 7,
    mes: 7,
    año: 1974
  },
  participacion_juegos_olimpicos: [2014, 1008, 2015, 2018],
  equipo: "equipo femeino canadiense",
  categorias_jugadas: "Mixtos",
  victorias: 3,
  derrotas: 1
}

```

##Cuarto documento
```
{
  nombre_jugador: {
    nombre: "Anette",
    apellido: "Norberg"
  },
  fecha_nacimiento: {
    dia: 12,
    mes: 11,
    año: 1996
  },
  participacion_juegos_olimpicos: [2006, 2010],
  equipo: "equipo femenino canadiense",
  categorias_jugadas: "femeninos",
  victorias: 2,
  derrotas: 0
}
```

##Quinto documento
```
{
  nombre_jugador: {
    nombre: "Anna",
    apellido: "Hasselborg"
  },
  fecha_nacimiento: {
    dia: 4,
    mes: 9,
    año: 1989
  },
  participacion_juegos_olimpicos: [2018, 2022],
  equipo: "equipo femenino canadiense",
  categorias_jugadas: "Dobles",
  victorias: 0,
  derrotas: 2
}
```

##Sexto documento
```
{
  nombre_jugador: {
    nombre: "Niklas",
    apellido: "Edin"
  },
  fecha_nacimiento: {
    dia: 25,
    mes: 2,
    año: 1985
  },
  participacion_juegos_olimpicos: [2014, 2018, 2022],
  equipo: "equipo masculino canadiense",
  categorias_jugadas: "masculinos",
  victorias: 1,
  derrotas: 2
}
```

##Septimmo documento
```
{
  nombre_jugador: {
    nombre: "Patrik",
    apellido: "Lodgar"
  },
  fecha_nacimiento: {
    dia: 18,
    mes: 6,
    año: 1960
  },
  participacion_juegos_olimpicos: [1998],
  equipo: "equipo masculino suizo",
  categorias_jugadas: "Mixtos",
  victorias: 1,
  derrotas: 0
}
```

##Octavo documento
```
{
  nombre_jugador: {
    nombre: "Brunce",
    apellido: "Mouat"
  },
  fecha_nacimiento: {
    dia: 30,
    mes: 4,
    año: 1979
  },
  participacion_juegos_olimpicos: [1999, 2004],
  equipo: "equipo masculino britanico",
  categorias_jugadas: "Dobles",
  victorias: 1,
  derrotas: 1
}
```

##Noveno documennto
```
{
  nombre_jugador: {
    nombre: "Malena",
    apellido: "Bueno"
  },
  fecha_nacimiento: {
    dia: 19,
    mes: 5,
    año: 1995
  },
  participacion_juegos_olimpicos: [2009, 2018, 2022],
  equipo: "equipo femenino español",
  categorias_jugadas: "femeninos",
  victorias: 2,
  derrotas: 1
}
```

##Decimo documento
```
{
  nombre_jugador: {
    nombre: "Eda",
    apellido: "Owl"
  },
  fecha_nacimiento: {
    dia: 18,
    mes: 1,
    año: 1978
  },
  participacion_juegos_olimpicos: [1997, 1999],
  equipo: "equipo femenino americano",
  categorias_jugadas: "femeninos",
  victorias: 0,
  derrotas: 2
}
```

#Primer incremento (Inicio)

Antes de este incremento he seleccionado en primer lugar un conjuntos de Historias de Usuario, que serán las que conformen el 
primer incremento de nuestro programa; es decir, el primer commit que realizaremos.
![Captura de los diez documentos creado](./assets/img/HU_1.png)

Con esto señalado, podemos comenzar a programar la primera historia de usuario de nuestro programa.

##Primera Historia de Usuario

En esta primera historia de usuario hemos trabajado con dos archivos "ms-plantilla\callbacks.js" y "ms-plantilla.js".
En la primera de ellas, modificaremos la clase de AcercaDe y en la segunda miraremos las comprobaciones que ha realizado con TDD

```
acercaDe: async (req, res) => {
        try {
            CORS(res).status(200).json({
                mensaje: "Microservicio MS Plantilla: acerca de",
                autor: "Magdalena Bueno Pedrera",
                email: "mmbp0003@red.ujaen.es",
                fecha: "19/01/2001"
            });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },
```
*callback.js modificado.* &#8593;

Mientras que, las comprobaciones que se nos indica con TDD serán 3 de ellas; cuando se le pasa un objeto que no tiene los campos correspondientes,
cuando se muestras valores que no son un objeto y cuando se le pasa un valor nulo.
![Captura de la primera HU en la página web](./assets/img/HU_2.PNG)

##Segunda Historia de Usuario

