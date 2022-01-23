/**
 * Archivo con declaraciones de funciones relacionadas con sockets
 * 
 */

import { Socket } from "socket.io";
import { IMensaje } from "../interfaces/imensaje";

export const desconectar = (cliente: Socket) => {
    // ON permite escuchar un evento

    // Escuchar cuando un cliente se desconecta del servidor
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}

export const mensaje = (cliente: Socket) => {
    // Escuchar evento de nombre mensaje, emitido por el cliente
    // El payload contiene la información que se envia con dicho evento
    cliente.on('mensaje', (payload: IMensaje) => {
        console.log('Mensaje recibido', payload);
    })
}