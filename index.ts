// const Nombre='Edgar Carrillo Moreno';
// console.log(`Mi Nombre es ${Nombre}`);

import Server from './Classes/server'
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server =  Server.instance;
//BodyPARSEr
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

/// CORS
server.app.use(cors({origin:true, credentials:true}))

//rutas de servicios
server.app.use('/', router)

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
    
});