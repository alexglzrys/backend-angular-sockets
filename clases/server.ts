import express from 'express';
import { SERVER_PORT } from '../global/environment';

export default class Server {
    // Es necesario instalar la librería de declaración de tipos de express en modo desarrollo
    // Basta con colocar el puntero sobre el nombre del paquete para que VSCode nos indique el nombre del paquete a instalar
    public app: express.Application;
    public port: number;

    constructor() {
        // Crear una instancia de la aplicación express
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(callback: Function) {
        // Lanzar la aplicación express en el puerto indicado
        this.app.listen(this.port, callback());
    }
}