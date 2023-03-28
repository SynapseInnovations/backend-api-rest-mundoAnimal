const conexion = require("../../database");
const { cuentaHelper } = require("./cuenta.helper");
const jwt = require("jsonwebtoken");
const { validateRUT } = require("validar-rut");
const  Cuenta  = require("../../class/cuenta")

const Registrar = async(usuario) =>{
      nuevoUsuario = new Cuenta(usuario)
      const rut = nuevoUsuario.rut;

      if(!validateRUT(rut)){
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (!(await cuentaHelper.VerificarUsuarioSistema(rut))) {
        throw new TypeError("El usuario ya existe");
      }

      await nuevoUsuario.Registrar();
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

      const [userEncontrado] = await Cuenta.Perfil(rut);
      console.log(userEncontrado.clave)
      console.log(clave)

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

const Modificar = async(usuario) =>{
      modificarUsuario = new Cuenta(usuario);

      if (!validateRUT(modificarUsuario.rut)) {
            throw new TypeError("El RUT ingresado no es válido");
      }

      if (await cuentaHelper.VerificarUsuarioSistema(modificarUsuario.rut)) {
            throw new TypeError("No existe el usuario.");
      }

      return await modificarUsuario.Modificar();
};

module.exports.cuentaModel = {
      Registrar,
      Modificar,
      IniciarSesion
}