const conexion = require("../../database");
const { cuentaHelper } = require("./cuenta.helper");
const jwt = require("jsonwebtoken");
const { validateRUT } = require("../../libs/VerificadorRut")
const  Cuenta  = require("../../class/cuenta")

const Registrar = async(usuario, file) =>{
      nuevoUsuario = new Cuenta(usuario)
      const rut = nuevoUsuario.rut;

      if(!validateRUT(rut)){
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (!(await cuentaHelper.VerificarUsuarioSistema(rut))) {
            throw new TypeError("El usuario ya existe");
      }

      if(file==undefined){
            nuevoUsuario.imagen = `${process.env.IMG_TEMPORAL_REDONDA}`;
      }else{
            nuevoUsuario.imagen = `${process.env.HOST}/public/cuentas/${file.filename}`;
      }

      await nuevoUsuario.Registrar();

      const token = jwt.sign({ rut }, process.env.SECRET, {
            expiresIn: 86400 // 24 Horas
      });
      return token;
};

const Modificar = async(usuario, file) =>{
      modificarUsuario = new Cuenta(usuario);
      const imgModificado = usuario.modificarImagen == "false" ? false : true
      const pwModificado = usuario.clave == '' ? false : true
      if (!validateRUT(modificarUsuario.rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(modificarUsuario.rut)) {
            throw new TypeError("No existe el usuario.");
      }

      if (imgModificado) {
            modificarUsuario.imagen = `${process.env.HOST}/public/cuentas/${file.filename}`;
      }

      return await modificarUsuario.Modificar(imgModificado, pwModificado);
};


const IniciarSesion = async(usuario) => {
      const { rut , clave } = usuario;

      if (!validateRUT(rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(rut)) {
            throw new TypeError("No existe el usuario.");
      }

      const [userEncontrado] = await Cuenta.Perfil(rut);

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

const Eliminar = async(rut) =>{

      if (!validateRUT(rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(rut)) {
            throw new TypeError("No existe el usuario.");
      }

      return await Cuenta.Eliminar(rut)
};

const Habilitar = async(rut)=>{
      if (!validateRUT(rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(rut)) {
            throw new TypeError("No existe el usuario.");
      }

      const RolOperador = 2;
      const sql_habilitar = `UPDATE Cuenta SET Rol_id = ${RolOperador} WHERE rut = '${rut}'`;
      return await conexion.query(sql_habilitar);
};

module.exports.cuentaModel = {
      Registrar,
      Modificar,
      IniciarSesion,
      Eliminar,
      Habilitar
}