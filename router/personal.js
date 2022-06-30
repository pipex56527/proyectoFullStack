const express = require('express');
const funcGlobales = require('./funcionesGlobales');
const router = express.Router();



const Personal = require('../models/personal');


router.get('/', async (req, res) => {

    //Se valida que la sesion sea correcta (validarSesion retorna true si todo es correcto)
    if (funcGlobales.validarSesion(req,res,'Antes debería auntenticarse, deje de ser descarad@.')) {
        try {

            //const arrayPersonalDB = await Personal.find({ cedula: 123456789 });
            // Esta es la forma en como hacemos el select. Si enviamos un objeto con su valor, por ejemplo la llave
            // la funcion find() devolverá solo el registro que encuentre con ese valor. Si no se envía nada
            // dentro del find() entonces find() retornará todos los registros de la colección que se consult
            const arrayPersonalDB = await Personal.find();
            //console.log(arrayPersonalDB);

            res.render('personal', {

                arrayPersonal: arrayPersonalDB

            })
        } catch (error) {
            console.log(error);
        }
    }


})

module.exports = router;