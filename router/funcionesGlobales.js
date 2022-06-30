function validarSesion(req, res, mensajeError){
    try {
        if (!req.session.usuario || !req.session.contrasenia) {
            res.render('index', {
                inicioSesionRespuesta: false,
                mensajeLogin: mensajeError
            })
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    validarSesion
}