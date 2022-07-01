const express = require('express');
const router = express.Router();







router.get('/', async (req, res) => {

    if (!req.session.usuario) {
        res.render('index', {
            inicioSesionRespuesta: false,
            mensajeLogin: "Antes debería auntenticarse, deje de ser descarad@."
        })
    } else {



        req.session.destroy();
        res.render('index', {
            inicioSesionRespuesta: true,
            mensajeLogin: "logoff",
            usuarioBD: {rol: 0} 
        })
    }
})

module.exports = router;