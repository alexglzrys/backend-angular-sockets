import bodyParser from "body-parser";
import Server from "./clases/server";
import cors from 'cors';
import { SERVER_PORT } from "./global/environment";
import router from "./routes/router";

// Generar una sola instancia del servidor (patrón Singleton)
const server = Server.instance;

// Middlewares
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
// cors
server.app.use(cors({ origin: true, credentials: true }));

// Configuración de rutas
server.app.use('/', router)

server.start(() => {
    // Incializar el server
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});