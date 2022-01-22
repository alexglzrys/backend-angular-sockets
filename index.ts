import Server from "./clases/server";
import { SERVER_PORT } from "./global/environment";

// Generar una instancia del servidor
const server = new Server();

server.start(() => {
    // Incializar el server
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});