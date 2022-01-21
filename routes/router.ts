
import {Router, Request, Response, request} from 'express';
import { Socket} from 'socket.io';
import Server from '../Classes/server';
import { usuariosConectado } from '../sockets/sockets';


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


/// Servicio para optener los ID de los usuarios



router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});


// obtener usuarios y nombres


router.get('/usuarios/detalle',(req:Request,res:Response)=>{

  
const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: usuariosConectado.getLista(),
        });

});
});

export default router;