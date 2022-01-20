
import {Router, Request, Response} from 'express';
import Server from '../Classes/server';

const router = Router();

router.post('/mensajes', (req:Request , res:Response)=> {

const cuerpo = req.body.cuerpo;
const de = req.body.de;

const payload ={cuerpo,de};

const server = Server.instance;
server.io.emit('mensaje-nuevo', payload);

res.json({
    ok:true,
    mensaje:'coneccion estable'
});


});

router.post('/mensajes/:id', (req:Request , res:Response)=> {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de; //Body recibe las variables enviadas segun la variable
    const id = req.params.id; // params es para recibir las variables del URL

    const payload = {de,cuerpo}

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload);

res.json({
    ok:true,
    cuerpo,
    de,
    id
});
});
export default router;