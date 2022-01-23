/**
 * Archivo con declaraciones de funciones relacionadas con sockets
 * 
 */

import { Server, Socket } from "socket.io";
import { IMensaje } from "../interfaces/imensaje";

export const desconectar = (cliente: Socket) => {
    // ON permite escuchar un evento

    // Escuchar cuando un cliente se desconecta del servidor
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}

export const mensaje = (cliente: Socket, io: Server) => {
    // Escuchar evento de nombre mensaje, emitido por el cliente
    // El payload contiene la información que se envia con dicho evento
    cliente.on('mensaje', (payload: IMensaje) => {
        console.log('Mensaje recibido', payload);

        // Hacer algo con ese mensaje.
        // Generalmente se le notifica a los demás clientes esa información, por medio de otro evento
        // El servidor de sockets es el que tiene la información de que clientes son los que actualmente estan conectados
        io.emit('mensaje-nuevo', payload);
    })
}