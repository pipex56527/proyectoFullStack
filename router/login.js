const express = require('express');
const router = express.Router();







router.post('/', (req, res) => {
    const body = req.body


    //Se crea la sesión - Previamente se debe validar contra la base de datos si estos datos son correctos.
    let usuarioIngresado = body.usuario;
    let contraseniaIngresada = body.contrasenia;

    if (usuarioIngresado === 'prueba@prueba.com' && contraseniaIngresada === '123') {



        try {

            //almacena los nuevos datos de sesion
            req.session.usuario = usuarioIngresado;
            req.session.contrasenia = contraseniaIngresada;

            //redirige a la pagina de mascotas
            res.redirect('/personal')

        } catch (error) {
            console.log("No se ha podido crear la sesión." + error);
        }
    }else{
        console.log("Datos de inicio de sesion inválidos");
        res.render('index',{
            inicioSesionRespuesta: false,
            mensajeLogin: "Credenciales inválidas."
        })

    }
   
})



module.exports = router;