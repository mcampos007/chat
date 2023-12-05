import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouters from "./routes/views.router.js";
import {Server} from "socket.io";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = 5000;
const httpServer = app.listen(PORT, () =>{
    console.log(`Server Express online in port ${PORT}`);
});

const io = new Server(httpServer);

// Middlewares
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(logger);

//Inicializndo el motor
app.engine('hbs', handlebars.engine({
    extname:"hbs",
    defaultLayout:"main"
}));

//Ubicacion de las vistas
app.set('views', `${__dirname}/views`);

//Indico que el motor inicializad
app.set('view engine', 'hbs');

//Seteo de la rutas estática
app.use(express.static(`${__dirname}/public`));

app.use('/', viewsRouters);

const messages = [];

io.on('connection', socket =>{
    console.log("Nuevo cliente conectado");

    socket.on('message', data => {
        
        messages.push(data);
        io.emit('messageLogs', messages);
    });
    socket.on("inicio", data => {
        console.log(`Usuario iniciado: ${data}` );
        io.emit("messageLogs", messages);
        socket.broadcast.emit("connected", data);
    });

})

