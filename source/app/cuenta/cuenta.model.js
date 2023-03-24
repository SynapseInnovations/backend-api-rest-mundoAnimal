const conexion = require("../../database");
const { cuentaHelper } = require("./cuenta.helper");
const jwt = require("jsonwebtoken");
const { rolModel } = require("./rol/rol.model");
const { validateRUT } = require("validar-rut");
const  Cuenta  = require("../../class/cuenta")

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

      let clave = await Cuenta.EncriptarClave(usuario.clave);
      
      let direccion = usuario.direccion;

      let sql_RegistrarUsuario = 
      `INSERT INTO Cuenta(rut, nombre, correo, clave, direccion)
      VALUES ('${rut}','${nombre}','${correo}','${clave}','${direccion}');
      `;
      
      await Promise.all([
        conexion.query(sql_RegistrarUsuario),
        rolModel.AsignarRol(rut, "Usuario"),
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

      const [userEncontrado] = await cuentaHelper.PerfilUsuario(rut);
      console.log(userEncontrado.rut)
      if (!(await Cuenta.CompararClave(clave, userEncontrado.clave))) {
        throw new TypeError("Clave incorrecta");
      }
      
      const token = jwt.sign({ id: userEncontrado.rut }, process.env.SECRET, {
            expiresIn: 86400, // 24 Horas
      });

      let inicio_sesion = []
      inicio_sesion.push(userEncontrado);
      inicio_sesion.push({token: token});
      return inicio_sesion;
};

const Listar = async()=>{
      const sql_ListaUsuarios = `SELECT * FROM Cuenta`;
      listaRutUsuario = await conexion.query(sql_ListaUsuarios);

      const listaUsuarioRoles = [];
      
      /*
      for(let i=0; i < listaRutUsuario.length ;i++){

            let usuarioRoles = await cuentaHelper.DatosUsuario(listaRutUsuario[i].rut)
            if(usuarioRoles.length > 0){
                  listaUsuarioRoles.push(usuarioRoles)
            }
      }*/

      return listaRutUsuario;
};

const Perfil = async(rut)=>{
      const sql_Perfil = `
            SELECT rut, nombre, correo, direccion, imagen, Rol_id FROM Cuenta WHERE Cuenta.rut = '${rut}';
      `;

      return await conexion.query(sql_Perfil);
};

module.exports.cuentaModel = {
      Registrar,
      IniciarSesion,
      Listar,
      Perfil
}