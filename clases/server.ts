import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';

export default class Server {
    private static _instance: Server;

    // Es necesario instalar la librería de declaración de tipos de express en modo desarrollo
    // Basta con colocar el puntero sobre el nombre del paquete para que VSCode nos indique el nombre del paquete a instalar
    public app: express.Application;
    public port: number;

    public io: SocketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        // Crear una instancia de la aplicación express
        this.app = express();
        this.port = SERVER_PORT;

        // Levantar un servidor HTTP puro que se encargue de gestionar nuestra aplicación de exppress
        this.httpServer = new http.Server( this.app );
        // Indicar a SocketIO que se encargue de escuchar el servidor HTTP
        this.io = SocketIO( this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        } );

        this.escucharSockets();
    }

    public static get instance()
    {
        // Patrón Singleton para tener una sola instancia de esta clase
        // y no tener varios sockets regados
        return this._instance || (this._instance = new this());
    }

    private escucharSockets()
    {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
        })
    }

    start(callback: Function) {
        // Lanzar la aplicación express en el puerto indicado
        this.httpServer.listen(this.port, callback());
    }
}