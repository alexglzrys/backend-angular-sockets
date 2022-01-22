import { Router, Request, Response } from 'express';

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

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
})

export default router;