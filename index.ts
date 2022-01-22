import bodyParser from "body-parser";
import Server from "./clases/server";
import { SERVER_PORT } from "./global/environment";
import router from "./routes/router";

// Generar una instancia del servidor
const server = new Server();

// Middlewares
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Configuración de rutas
server.app.use('/', router)

server.start(() => {
    // Incializar el server
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});