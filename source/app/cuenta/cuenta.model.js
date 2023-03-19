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

      const userEncontrado = await cuentaHelper.PerfilUsuario(rut);

      if (!(await Cuenta.CompararClave(clave, userEncontrado[0].clave))) {
        throw new TypeError("Clave incorrecta");
      }
      
      const token = jwt.sign({ id: userEncontrado.rut }, process.env.SECRET, {
            expiresIn: 86400, // 24 Horas
      });

      userEncontrado.push({ token: token });
      return userEncontrado;
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
            SELECT Cuenta.nombre, correo, direccion, GROUP_CONCAT(DISTINCT Rol.nombre ORDER BY Rol.nombre ASC) AS roles
            FROM Cuenta 
            INNER JOIN RolesDeCuenta ON Cuenta.rut = RolesDeCuenta.Cuenta_rut
            INNER JOIN Rol ON RolesDeCuenta.Roles_id_rol = Rol.id_rol
            WHERE Cuenta.rut = '${rut}'
            GROUP BY Cuenta.nombre, correo, clave, direccion;
      `;

      let respuestaPerfil = await conexion.query(sql_Perfil);

      await respuestaPerfil.forEach((cuenta)=>{
            cuenta.roles = cuenta.roles.split(',');
      })

      return respuestaPerfil;
};

module.exports.cuentaModel = {
      Registrar,
      IniciarSesion,
      Listar,
      Perfil
}