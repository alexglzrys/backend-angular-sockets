import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';

import * as socket from '../sockets/socket'

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
        this.io = (SocketIO as any)( this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        } );

        // Esta función es la encargada de escuchar todos los eventos (mensajes) enviados a través de sockets
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
        // Escuchar cuando un cliente se conecta al servidor
        this.io.on('connection', cliente => {

            // En este punto se declaran todos los eventos que el cliente puede escuchar o puede emitir
            // Por tanto se recomienda declarar toda esa lógica en archivos separados
            // console.log('Cliente conectado');

            // Conectar cliente: 
            socket.conectarCliente(cliente);

            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Mensajes (En este punto se da una interacción de recepción de eventos por parte del cliente, y emisión de eventos a los demás clientes)
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente)
        })
    }

    start(callback: Function) {
        // Lanzar la aplicación express en el puerto indicado
        this.httpServer.listen(this.port, callback());
    }
}