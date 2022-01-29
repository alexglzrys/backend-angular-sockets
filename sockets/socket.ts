/**
 * Archivo con declaraciones de funciones relacionadas con sockets
 * 
 */

import { Server, Socket } from "socket.io";
import { Usuario } from "../clases/usuario";
import { UsuariosLista } from "../clases/usuarios-lista";
import { IMensaje } from "../interfaces/imensaje";

export const usuariosConectados = new UsuariosLista();

// Agregar el cliente al listado de usuarios conectados al socket server, identificandolo por el ID generado
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    // ON permite escuchar un evento

    // Escuchar cuando un cliente se desconecta del servidor
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        // Borrar el cliente del listado de clientes conectados al socket server
        usuariosConectados.borrarUsuario(cliente.id);
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

export const configurarUsuario = (cliente: Socket, io: Server) => {
    // Configurar usuario
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        // console.log('Usuario a configurar:', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}