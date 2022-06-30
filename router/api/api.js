const express = require('express');
const router = express.Router();
const usuarios = [{
        "id": 1,
        "Name": "Andres",
        "Apellido": "Agudelo",
        "Age": 22,
        "Cargo": "Develop IT"
    },
    {
        "id": 2,
        "Name": "Alex",
        "Apellido": "Rosario",
        "Age": 25,
        "Cargo": "Pintor"
    },
    {
        "id": 3,
        "Name": "Martin",
        "Apellido": "Gomez",
        "Age": 27,
        "Cargo": "Publicista"
    },
    {
        "id": 4,
        "Name": "Alberto",
        "Apellido": "Pineda",
        "Age": 29,
        "Cargo": "Diseñador"
    },
    {
        "id": 5,
        "Name": "Maria",
        "Apellido": "Reyes",
        "Age": 30,
        "Cargo": "Ingeniero"
    },
    {
        "id": 6,
        "Name": "Rosa",
        "Apellido": "Vargas",
        "Age": 34,
        "Cargo": "Economista"
    },
    {
        "id": 7,
        "Name": "Sandra",
        "Apellido": "Uribe",
        "Age": 48,
        "Cargo": "Analista de mercados"
    },
    {
        "id": 8,
        "Name": "Mateo",
        "Apellido": "Tamayo",
        "Age": 51,
        "Cargo": "Profesor"
    },
    {
        "id": 9,
        "Name": "David",
        "Apellido": "Garcia",
        "Age": 27,
        "Cargo": "Cientifico"
    },
    {
        "id": 10,
        "Name": "Jhon",
        "Apellido": "Jaramillo",
        "Age": 19,
        "Cargo": "Practicante"
    },
    {
        "id": 11,
        "Name": "Alejandra",
        "Apellido": "Mendes",
        "Age": 16,
        "Cargo": "Secretaria"
    },
    {
        "id": 12,
        "Name": "Sofia",
        "Apellido": "Hernandez",
        "Age": 45,
        "Cargo": "Directora"
    },
]


router.get('/consulta', (req, res) => {
    try {

        //console.log("El usuario solicitado es: " + req.body.id);
        let usuarioSolicitado = req.body.id;
        let objetoRespuesta = {
            "codRespuesta": 0,
            "mensajeRespuesta": "",
            "data": {
                "id": "",
                "Name": "",
                "Apellido": "",
                "Age": "",
                "Cargo": ""
            }
        }
        if (usuarioSolicitado != null) {
            let infoRetorno = {};
            usuarios.forEach(element => {
                if (element.id == usuarioSolicitado) {

                    infoRetorno.id = element.id
                    infoRetorno.Name = element.Name
                    infoRetorno.Apellido = element.Apellido
                    infoRetorno.Age = element.Age
                    infoRetorno.Cargo = element.Cargo

                }
            });
            if (Object.keys(infoRetorno).length != 0) {
                objetoRespuesta.codRespuesta = 00;
                objetoRespuesta.mensajeRespuesta = "La persona buscada ha sido encontrada";
                objetoRespuesta.data = infoRetorno;

                res.send(objetoRespuesta)
            } else {
                objetoRespuesta.codRespuesta = 01;
                objetoRespuesta.mensajeRespuesta = "No se encontro a la persona buscada.";

                res.send(objetoRespuesta)
            }

        } else {
            objetoRespuesta.codRespuesta = 02;
            objetoRespuesta.mensajeRespuesta = "El body no puede ser vacio.";

            res.send(objetoRespuesta)
        }
    } catch (error) {
        objetoRespuesta.codRespuesta = 99;
        objetoRespuesta.mensajeRespuesta = "Ha ocurrido un error grave: " + error;

        res.send(objetoRespuesta)
    }


})

router.post('/agregar', (req, res) => {
    let usuarioAgregar = req.body;
    let objetoRespuesta = {
        "codRespuesta": 0,
        "mensajeRespuesta": "",
        "data": {
            "id": "",
            "Name": "",
            "Apellido": "",
            "Age": "",
            "Cargo": ""
        }
    }

    if (usuarioAgregar.id != undefined &&
        usuarioAgregar.Name != undefined &&
        usuarioAgregar.Apellido != undefined &&
        usuarioAgregar.Age != undefined &&
        usuarioAgregar.Cargo != undefined
    ) {
        //console.log("El usuario recibido para agregar es" + usuarioAgregar);
        let existeUsuario = false;



        usuarios.forEach(element => {
            if (element.id == usuarioAgregar.id) {
                existeUsuario = true;
            }
        });

        if (!existeUsuario) {
            usuarios.push(usuarioAgregar)
            objetoRespuesta.codRespuesta = 00;
            objetoRespuesta.mensajeRespuesta = "La persona ha sido agregada correctamente.";
            objetoRespuesta.data = usuarioAgregar;

            res.send(objetoRespuesta)

        } else {
            objetoRespuesta.codRespuesta = 01;
            objetoRespuesta.mensajeRespuesta = "Este usuario ya existe, por lo cual no puede ser agregado.";
            objetoRespuesta.data = usuarioAgregar;

            res.send(objetoRespuesta)
        }

    } else {
        objetoRespuesta.codRespuesta = 02;
        objetoRespuesta.mensajeRespuesta = "El elemento no cuenta con la estructura correcta.";
        objetoRespuesta.data = usuarioAgregar;

        res.send(objetoRespuesta)
    }
});

router.delete('/eliminar', (req, res) => {
    let datoBorrar = req.body.id;
    let objetoRespuesta = {
        "codRespuesta": 0,
        "mensajeRespuesta": "",
        "data": {
            "id": "",
            "Name": "",
            "Apellido": "",
            "Age": "",
            "Cargo": ""
        }
    }

    if (datoBorrar != null) {


        let indiceBorrar = -1;
        let contador = 0;


        usuarios.forEach(element => {
            if (element.id == datoBorrar) {
                indiceBorrar = contador;
                objetoRespuesta.data = element;

            }
            contador++;
        });
        if (indiceBorrar != -1) {
            usuarios.splice(indiceBorrar, 1);
            objetoRespuesta.codRespuesta = 00;
            objetoRespuesta.mensajeRespuesta = "El usuario ha sido eliminado correctamente con el indice " + indiceBorrar;

            res.send(objetoRespuesta)


        } else {
            objetoRespuesta.codRespuesta = 01;
            objetoRespuesta.mensajeRespuesta = "El usuario que se intenta borrar no existe.";
            objetoRespuesta.data.id = datoBorrar;

            res.send(objetoRespuesta)
        }
    } else {
        objetoRespuesta.codRespuesta = 02;
        objetoRespuesta.mensajeRespuesta = "El ID del cliente que se desea eliminar es obligatorio.";
        objetoRespuesta.data.id = datoBorrar;

        res.send(objetoRespuesta)
    }

})



module.exports = router;