
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/mensajes', (req:Request , res:Response)=> {
res.json({
    ok:true,
    mensaje:'coneccion estable',
});
});

router.post('/mensajes/:id', (req:Request , res:Response)=> {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de; //Body recibe las variables enviadas segun la variable
    const id = req.params.id; // params es para recibir las variables del URL
res.json({
    ok:true,
    cuerpo,
    de,
    id
});
});
export default router;