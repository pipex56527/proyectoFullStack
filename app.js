/* const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "Este es un programa en NodeJs!",
    e : "oO",
    T : "U "
}));

const http = require('http');
const server = http.createServer((req,res) => {
    res.end('Estoy respondiendo a tu solicitud! :S')
});

const puerto = 3000;
server.listen(puerto, () => {
    console.log('Escuchando solicitudes...')
}) */

//lo anterior se llama con el comando >>nodemon app

/* 
Ahora para usar el paquete express:
>>npm i express */

const bodyParser = require('body-parser');
const express = require('express')
const app = express();

//Gestion de sesiones
const session = require('express-session');

app.use(session({
    secret: '2C44-4D44-WppQ38Ssj773jh.09',
    resave: true,
    saveUninitialized: true,
    cookie: {
 
        // Session expires after 3 min of inactivity. [1 min = 60.000]
        expires: 180000
    }
}));

//Parsea formularios
app.use(bodyParser.urlencoded({ extended: false}));
//Parsea json
app.use(bodyParser.json());

//sirve para exportar variables de entorno en el archivo .env
require('dotenv').config();

const port = process.env.PORT || 3000;

//Conexion a base de datos


const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = `mongodb+srv://${process.env.USUARIO_APP}:${process.env.CONTRASENIA_APP}@cluster0.j0rmp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
/* const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */



mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log("Se puteo todo, la BD no conecta.\n" + e));




app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + "/public"));

// Rutas Web
app.use('/', require('./router/rutasweb'));
app.use('/mascotas', require('./router/mascotas'));
app.use('/acercade', require('./router/acercade'));
app.use('/personal', require('./router/personal'));
app.use('/login', require('./router/login'));
app.use('/logoff', require('./router/logoff'));
app.use('/api', require('./router/api/api'));

app.use((req,res,next) =>{
    res.status(404).render('404')
})

app.listen(port, ()=>{
    console.log('Servidor a su servicio en el puerto: ' + port);
})



//lo anterior se llama con el comando >>nodemon app