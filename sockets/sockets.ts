import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../Classes/usuarios-lista';
import { Usuario } from '../Classes/usuario';

export const usuariosConectado = new UsuariosLista();


export const conectarCliente = ( cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectado.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', ()=>{
    console.log('Cliente Desconecctado');
    usuariosConectado.borrarUsuario(cliente.id);
    });

}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{
   cliente.on('mensaje', (payload:{de:string, cuerpo: string})=>{
    console.log('mensaje recibido', payload);

    io.emit('mensaje-nuevo', payload);
    
   });
}
// configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) =>{
   cliente.on('configurar-usuario', (payload:{nombre: string}, callback: Function)=>{
    // console.log('Configurando Usuario:', payload.nombre);
    usuariosConectado.actualizarNombre (cliente.id, payload.nombre);

    // io.emit('configurar-usuario', payload.nombre);
    callback({
        ok:true,
        mensaje:`Usuario ${payload.nombre}, configurado`,
    })
   });
}

