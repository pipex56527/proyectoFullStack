const express = require('express');
const funcGlobales = require('./funcionesGlobales');
const router = express.Router();



const Personal = require('../models/personal');


router.get('/', async (req, res) => {

    //Se valida que la sesion sea correcta (validarSesion retorna true si todo es correcto)
    if (funcGlobales.validarSesion(req,res,'Antes debería auntenticarse.')) {
        try {

            //const arrayPersonalDB = await Personal.find({ cedula: 123456789 });
            // Esta es la forma en como hacemos el select. Si enviamos un objeto con su valor, por ejemplo la llave
            // la funcion find() devolverá solo el registro que encuentre con ese valor. Si no se envía nada
            // dentro del find() entonces find() retornará todos los registros de la colección que se consult
            const arrayPersonalDB = await Personal.find();
            //console.log(arrayPersonalDB);

            res.render('personal', {

                arrayPersonal: arrayPersonalDB,
                usuarioBD: {rol: req.session.rol} 

            })
        } catch (error) {
            console.log(error);
        }
    }


})

//presenta la vista para crear nuevo médico
router.get('/crearMedico', async(req, res) =>{
    try {
        //const arrayPersonasDB = await Personal.find();

        res.render('crearMedico',{
            //arrayPersonas: arrayPersonasDB,
            usuarioBD: {rol: req.session.rol} 
        })

    } catch (error) {
        console.log(error);
    }
    
});

//Permite guardar en la base de datos un nuevo médico. METODO POST enviado por crearMedico (GET)
router.post('/crearMedico', async(req, res) => {
    const body = req.body
    //console.log(body);
    try {
/*         //Metodo 1
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        //console.log("Mascota creada:\n" + mascotaDB); */

        //Metodo 2
        await Personal.create(body);

        //redirige a la pagina de mascotas
        res.redirect('/personal')

    } catch (error) {
        console.log("Se ha presentado un error al guardar en la BD: " + error);
    }
})

//muestra vista que permite editar personal médico.
router.get('/:id', async(req, res) => {

    const id = req.params.id

    try {
        
        const personaDB = await Personal.findOne({ _id: id });
        
        
        //console.log(personaDB);
        res.render('detallePersonal', {
            persona: personaDB,
            usuarioBD: {rol: req.session.rol} ,
            error: false
        })

    } catch (error) {
        res.render('detallePersonal', {
            error: true,
            mensaje: "No se encuentra el id seleccionado."
        })
    }
})

//permite actualizar personal medico
router.put('/:id', async(req,res) => {
    const id = req.params.id;
    const body = req.body
    //console.log("por aqui pase...");

    try {

        const personalDB = await Personal.findByIdAndUpdate(id, body, { useFindAndModify: false})
        //console.log(mascotaDB);
        res.json({
            estado: true,
            //usuarioBD: {rol: req.session.rol} ,
            mensaje: 'Personal editado!'
        })

    } catch (error) {
        console.log("Se ha presentado un error al dar clic en el boton Editar" + error);
        res.json({
            estado: false,
            //usuarioBD: {rol: req.session.rol} ,
            mensaje: 'Personal no Editado ;(!'
        })
    }
})

//permite eliminar personal medico
router.delete('/:id', async(req,res) => {
    const id = req.params.id;

    try {
        const personaDB = await Personal.findByIdAndDelete({_id: id});
        if (personaDB) {
            res.json({
              estado: true,
              mensaje: 'Eliminado!'  
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar al personal medico!'  
              })

        }
    } catch (error) {
        console.log("Se presentó un error al eliminar al personal medico:\n" + error);
    }
})

module.exports = router;