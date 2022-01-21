import { Usuario } from './usuario';
export class UsuariosLista {

private lista: Usuario[] = [];

  constructor () {}


  // agregar usuarios
  public agregar( usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
    }

    //// actualizar nombre de usuario
  public actualizarNombre(id:string, nombre:string) {
   for (let Usuario of this.lista) {
       if (Usuario.id === id){
       Usuario.nombre = nombre;
       break;
       }   
   }
   console.log('======= Actualizando Usuario======');
   console.log(this.lista);
  } 
  
  /// Obtener lista de Usuarios

  public getLista() {
     return this.lista.filter(usuario => usuario.nombre !=='sin nombre');
  }

   public getUsuario(id:string){
     return this.lista.find( usuario => usuario.id === id);
   }



  /// Obtener usuarios de una sala en  particular
  public getUsuariosSala(sala:string) {
     return this.lista.filter(usuario => usuario.sala === sala);
  }

  // Borrar Usuario

  public borrarUsuario(id: string) {
      const tempUsuario =  this.getUsuario(id);
     this.lista = this.lista.filter(usuario => usuario.id !== id);
    //  console.log(this.lista);
    return tempUsuario;
  }

}