const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{
        inicioSesionRespuesta: true,
        mensajeLogin: "Ingreso a la aplicación."
    })
    
})

router.get('/servicios', (req,res) => {
    res.render('servicios', {tituloServicios: "Bienvenid@ esta es una página a tu disposición"})
})

module.exports = router;