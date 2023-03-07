const conexion = require("../../database");
const { cuentaHelper } = require("./cuenta.helper");
const { cuentaClase } = require("../../models/cuenta")
const jwt = require("jsonwebtoken");
const { rolModel } = require("./rol/rol.model");
const { validateRUT } = require("validar-rut");

const Registrar = async(usuario) =>{
      let rut = usuario.rut;
      
      if(!validateRUT(rut)){
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (!await cuentaHelper.VerificarUsuarioSistema(rut)) {
            throw new TypeError("El usuario ya existe");
      }

      let nombre = usuario.nombre;
      let correo = usuario.correo;
      let clave = await cuentaClase.CuentaUsuario.EncriptarClave(usuario.clave);
      
      let direccion = usuario.direccion;

      let sql_RegistrarUsuario = 
      `INSERT INTO Cuenta(rut, nombre, correo, clave, direccion)
      VALUES ('${rut}','${nombre}','${correo}','${clave}','${direccion}');
      `;
      await Promise.all([
            conexion.query(sql_RegistrarUsuario),
            rolModel.AsignarRol(rut)
      ]);

      const token = jwt.sign({ rut }, process.env.SECRET, {
            expiresIn: 86400 // 24 Horas
      });
      return token;
};

const IniciarSesion = async(usuario) => {
      const { rut , clave } = usuario;

      if (!validateRUT(rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(rut)) {
            throw new TypeError("No existe el usuario.");
      }

      const userEncontrado = await rolModel.ObtenerRol(rut);
      if(!await cuentaClase.CuentaUsuario.CompararClave(clave,userEncontrado.clave)){
            throw new TypeError("Clave incorrecta");
      }
      
      const token = jwt.sign({ id: userEncontrado.rut }, process.env.SECRET, {
            expiresIn: 86400, // 24 Horas
      });

      return token;
}

const Listar = async()=>{
      const sql_ListaUsuarios = `SELECT rut FROM Cuenta`;
      listaRutUsuario = await conexion.query(sql_ListaUsuarios);

      const listaUsuarioRoles = [];

      for(let i=0; i < listaRutUsuario.length ;i++){

            let usuarioRoles = await cuentaHelper.DatosUsuario(listaRutUsuario[i].rut)
            if(usuarioRoles.length > 0){
                  listaUsuarioRoles.push(usuarioRoles)
            }
      }

      return listaUsuarioRoles;
}

module.exports.cuentaModel = {
      Registrar,
      IniciarSesion,
      Listar
}