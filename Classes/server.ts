
import express from 'express';
import { SERVER_PORT } from '../global/envarioment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
import { configurarUsuario } from '../sockets/sockets';

export default class Server {
private static _instance: Server; // ayuda a tener una unica instaicia de la clase server y un socket
public  app: express.Application;
public port: number;
public io: socketIO.Server;
private httpServer: http.Server;



private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server( this.app );
    // this.io =  socketIO(this.httpServer); /// provoca error http request origin access que hace referencia a los permisos 
    this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

    this.escucharSockets();
}

public static get instance() {
return  this._instance || (this._instance =  new this());
}

            private escucharSockets(){
            console.log('escuchando conexion de sockets');
                this.io.on('connection', cliente =>{

                // console.log('Nuevo Cliente Conectado');
                console.log(cliente.id);

                socket.conectarCliente(cliente, this.io );//conectar cliente
                
                socket.configurarUsuario(cliente, this.io); /// llama a la funcion creada en la carpeta sockets
                //obtener usuarios activos
                socket.ObtenerUsuarios(cliente, this.io);
                socket.mensaje(cliente, this.io); /// mensajes
                socket.desconectar(cliente, this.io); /// llama a la funcion creada en la carpeta sockets
             
                });
            }

            start(callback: any):void {
            // this.app.listen(this.port, callback);
            this.httpServer.listen(this.port, callback);
            }

}

