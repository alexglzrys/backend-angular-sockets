import { Router, Request, Response, response } from 'express';
import Server from '../clases/server';

const router: Router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta correcto'
    });
});

router.post('/mensaje', (req: Request, res: Response) => {
    const { cuerpo, de } = req.body;
    
    // enviar mensaje a todos los usuarios conectados al canal global
    const server = Server.instance;
    const payload = {de, mensaje: cuerpo};
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const { cuerpo, de } = req.body;
    const id: string = req.params.id

    // Enviar mensaje privado al usuario con id especificado (ID que el WS le asigna al conectarse)
    const server = Server.instance;
    const payload = {de, cuerpo};
    // En este caso la sala corresponde a su ID asignado por el WS
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
})

// Servicio para recuperar los IDs de usuarios conectados (sockets)
router.get('/usuarios', async (req: Request, res: Response) => {
    const server = Server.instance;
    try {
        // Recuperar todos los sockets activos
        const sockets = await server.io.allSockets();
        return res.json({
            ok: true,
            // Devolverlos como un arreglo
            clients: Array.from(sockets)
        })
    } catch(err) {
        return res.json({
            ok: false,
            err
        })
    }
    
})

export default router;