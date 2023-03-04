const conexion = require("../../database");
const { cuentaHelper } = require("./cuenta.helper");

const Registrar = async(usuario) =>{
      let rut = usuario.rut;
      let nombre = usuario.nombre;
      let correo = usuario.correo;
      let clave = usuario.clave;
      let direccion = usuario.direccion;

      if(await cuentaHelper.VerificarUsuario(rut)){
            throw new TypeError("El usuario ya existe.");
      }
      
      let sql_RegistrarUsuario = 
      `INSERT INTO Cuenta(rut, nombre, correo, clave, direccion)
      VALUES ('${rut}','${nombre}','${correo}','${clave}','${direccion}')
      `

      return await conexion.query(sql_RegistrarUsuario);
};

const Listar = async()=>{
      let sql_ListarUsuarios = 
      `SELECT * FROM Cuenta`
      return await conexion.query(sql_ListarUsuarios);
}

module.exports.cuentaModel = {
      Registrar,
      Listar
}