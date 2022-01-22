import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta correcto'
    });
});

export default router;