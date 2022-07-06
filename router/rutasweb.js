const express = require('express');
const router = express.Router();
const funcGlobales = require('./funcionesGlobales');

router.get('/', (req,res) => {
    res.render('index',{
        inicioSesionRespuesta: true,
        mensajeLogin: "Ingreso a la aplicación.",
        usuarioBD: {
            codigo: 0,
            contrasenia: "",
            rol: 0
        }
    })
    
})



router.get('/servicios', (req,res) => {
    let rolPermitido = 200;
    if (funcGlobales.validarSesion(req, res, rolPermitido)) {
    res.render('servicios', {
        tituloServicios: "Bienvenid@ esta es una página a tu disposición",
        usuarioBD: {rol: req.session.rol} 
    })
}
})

module.exports = router;