function validarSesion(req, res, rolPermitido){
    try {
        if (!req.session.usuario || !req.session.contrasenia || !req.session.rol) {
            res.render('index', {
                inicioSesionRespuesta: false,
                mensajeLogin: "Antes debería autenticarse",
                usuarioBD: 0
            })
            return false;

        }else if(req.session.rol < rolPermitido){
            res.render('index', {
                inicioSesionRespuesta: false,
                mensajeLogin: "Su rol no le permite acceder a esta funcionalidad.",
                usuarioBD: 0
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