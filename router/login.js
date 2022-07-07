const express = require('express');
const router = express.Router();
//const Sala = require('../models/sala');
const Usuario = require('../models/usuario');






router.post('/', async (req, res) => {
    const body = req.body


    //Se crea la sesión - Previamente se debe validar contra la base de datos si estos datos son correctos.
    let usuarioIngresado = body.usuario;
    let contraseniaIngresada = body.contrasenia;





    try {

        const usuarioBD = await Usuario.findOne({
            codigo: usuarioIngresado,
            contrasenia: contraseniaIngresada
        });

/*         console.log("usuarioIngresado:      " + usuarioIngresado);
        console.log("contraseniaIngresada:  " + contraseniaIngresada);
        console.log("usuarioBD.codigo:      " + usuarioBD.codigo);
        console.log("usuarioBD.contrasenia: " + usuarioBD.contrasenia); */

        if ((usuarioBD.codigo != undefined) && (usuarioBD.contrasenia != undefined)) {
            //almacena los nuevos datos de sesion
            req.session.usuario = usuarioIngresado;
            req.session.contrasenia = "Hacker no tienes la contrasenia?";
            req.session.rol = usuarioBD.rol;
            req.session.nombre = usuarioBD.nombre;

            //console.log("Rol: " + req.session.rol);

            //redirige a la pagina de mascotas
            res.redirect('/mascotas')



        } else {
            console.log("Datos de inicio de sesion inválidos");
            res.render('index', {
                inicioSesionRespuesta: false,
                mensajeLogin: "Credenciales inválidas.",
                usuarioBD: {
                    codigo: 0,
                    contrasenia: "",
                    rol: 0
                }
            })

        }

    } catch (error) {
        console.log("Datos de inicio de sesion inválidos");
        res.render('index', {
            inicioSesionRespuesta: false,
            mensajeLogin: "Datos de inicio de sesión inválidos",
            usuarioBD: {
                codigo: 0,
                contrasenia: "",
                rol: 0
            }
        })
    }


})



module.exports = router;