const express = require('express');
const router = express.Router();
const funcGlobales = require('./funcionesGlobales');
const rolPermitido = 200;

router.get('/', (req, res) => {
    if (funcGlobales.validarSesion(req, res, rolPermitido)) {
        res.render('acercade', {
            usuarioBD: {
                rol: req.session.rol
            }
        })
    }
})

module.exports = router;