/**
 * Archivo con declaraciones de funciones relacionadas con sockets
 * 
 */

import { Socket } from "socket.io";

export const desconectar = (cliente: Socket) => {
    // ON permite escuchar un evento

    // Escuchar cuando un cliente se desconecta del servidor
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}