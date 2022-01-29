import { Router, Request, Response } from 'express';
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

export default router;