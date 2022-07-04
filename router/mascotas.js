const express = require("express");
const router = express.Router();

const Mascota = require("../models/mascota");
const Personal = require("../models/personal");
const Sala = require("../models/sala");
const HistoriaClinica = require("../models/historiaClinica");

router.get("/", async (req, res) => {
    if (!req.session.usuario) {
        res.render("index", {
            inicioSesionRespuesta: false,
            mensajeLogin: "Antes debería auntenticarse, deje de ser descarad@.",
        });
    } else {
        try {
            const arrayMascotasDB = await Mascota.find();
            const arrayPersonasDB = await Personal.find();
            const arraySalasDB = await Sala.find();
            //console.log(arrayMascotasDB);

            res.render("mascotas", {
                arrayMascotas: arrayMascotasDB,
                arrayPersonas: arrayPersonasDB,
                arraySalas: arraySalasDB,
                usuarioBD: {
                    rol: req.session.rol
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
});

router.get("/crear", async (req, res) => {
    try {
        const arrayPersonasDB = await Personal.find();
        const arraySalasDB = await Sala.find();
        res.render("crear", {
            arrayPersonas: arrayPersonasDB,
            arraySalas: arraySalasDB,
            usuarioBD: {
                rol: req.session.rol
            },
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    const body = req.body;
    //console.log(body);
    try {
        /*         //Metodo 1
            const mascotaDB = new Mascota(body)
            await mascotaDB.save()
            //console.log("Mascota creada:\n" + mascotaDB); */

        //Metodo 2
        await Mascota.create(body);

        //redirige a la pagina de mascotas
        res.redirect("/mascotas");
    } catch (error) {
        console.log("Se ha presentado un error al guardar en la BD: " + error);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({
            _id: id
        });
        const personaDB = await Personal.find();
        const salaDB = await Sala.find();
        //console.log(personaDB);
        res.render("detalle", {
            mascota: mascotaDB,
            persona: personaDB,
            sala: salaDB,
            usuarioBD: {
                rol: req.session.rol
            },
            error: false,
        });
    } catch (error) {
        res.render("detalle", {
            error: true,
            mensaje: "No se encuentra el id seleccionado.",
        });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findByIdAndDelete({
            _id: id
        });
        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: "Eliminado!",
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se puede eliminar la mascota!",
            });
        }
    } catch (error) {
        console.log("Se presentó un error al eliminar una mascota:\n" + error);
    }
});

//Actualiza la informacion de una mascota
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        let date_ob = new Date();
/*         let diaActual = date_ob.getDate();
        let mesActual = date_ob.getMonth();
        let anioActual = date_ob.getFullYear(); */
        let horaActual = date_ob.getHours();
        let minutoActual = date_ob.getMinutes();
        let segundoActual = date_ob.getSeconds();
        let indicadorFechas = null;
     
       
        if( body.fechaIngreso.length>8 && body.fechaIngreso != null && body.fechaIngreso!= undefined){
            body.fechaIngreso =
                body.fechaIngreso +
                " " +
                horaActual +
                ":" +
                minutoActual +
                ":" +
                segundoActual;
                indicadorFechas=1;
      
        }else{
            const mascotaActualizada=await Mascota.findById({_id: id});
            body.fechaIngreso = mascotaActualizada.fechaIngreso;
        }
  

        if( body.fechaSalida.length>8 && body.fechaSalida != null && body.fechaSalida!= undefined){
                body.fechaSalida =
                    body.fechaSalida +
                    " " +
                    horaActual +
                    ":" +
                    minutoActual +
                    ":" +
                    segundoActual;
                }else{
                    const mascotaActualizada=await Mascota.findById({_id: id});
                    body.fechaSalida = mascotaActualizada.fechaSalida;
                }


        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {
            useFindAndModify: false,
        });
        //console.log(mascotaDB);
        res.json({
            estado: true,
            mensaje: "Mascota editada!",
        });
    } catch (error) {
        console.log(
            "Se ha presentado un error al dar clic en el boton Editar" + error
        );
        res.json({
            estado: false,
            mensaje: "Mascota no Editada ;(!",
        });
    }
});

//renderiza la vista de historia Clinica
router.get("/historiaClinica/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({
            _id: id
        });
        const personaDB = await Personal.find();
        const salaDB = await Sala.find();
        console.log("ID buscado: " + id + ".");
        const historiaClinicaDB = await HistoriaClinica.find({
            idMascota: id
        });
        // console.log("Historia: " + historiaClinicaDB);
        //console.log(personaDB);
        console.log("Rol: " + req.session.rol);
        res.render("historiaClinica", {
            mascota: mascotaDB,
            persona: personaDB,
            sala: salaDB,
            historiaClinica: historiaClinicaDB,
            usuarioBD: {
                rol: req.session.rol
            },
            error: false,
        });
    } catch (error) {
        res.render("detalle", {
            error: true,
            usuarioBD: {
                rol: req.session.rol
            },
            mensaje: "La mascota no posee historia clínica o no se puede visualizar.",
        });
    }
});

router.post("/historiaClinica", async (req, res) => {
    const body = req.body;
    //console.log(body);
    try {
        /*         //Metodo 1
            const mascotaDB = new Mascota(body)
            await mascotaDB.save()
            //console.log("Mascota creada:\n" + mascotaDB); */

        //Metodo 2
        console.log("Fecha de Registro:" + body.fechaRegistro);
        let date_ob = new Date();
        let horaActual = date_ob.getHours();
        let minutoActual = date_ob.getMinutes();
        let segundoActual = date_ob.getSeconds();

        body.fechaRegistro =
            body.fechaRegistro +
            " " +
            horaActual +
            ":" +
            minutoActual +
            ":" +
            segundoActual;

        body.idMascota = body.idMascota.trim();
        await HistoriaClinica.create(body);

        //redirige a la pagina de historia clinica
        res.redirect("/mascotas/historiaClinica/" + body.idMascota.trim());
    } catch (error) {
        console.log("Se ha presentado un error al guardar en la BD: " + error);
    }
});

module.exports = router;