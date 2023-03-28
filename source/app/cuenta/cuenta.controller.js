const { cuentaModel } = require("./cuenta.model");
const Cuenta = require("../../class/cuenta");

const mostrarUsuarios = async(req,res) =>{
      try{
            const consulta_mostrarUsuarios = await Cuenta.ListaUsuarios();
            return res.status(200).json({
                  error: false,
                  msg: "Lista de todos los usuarios del sistema",
                  data: consulta_mostrarUsuarios
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
              error: true,
              msg: "" + error.message,
            });
      }
};

const registrarUsuario = async(req, res) =>{
      try{
            let consulta_registrarUsuario = await cuentaModel.Registrar(req.body, req.file);
            return res.status(200).json({
                  error: false,
                  msg: "Usuario creado exitosamente",
                  token: consulta_registrarUsuario
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const iniciarSesion = async(req,res)=>{
      try{
            let consulta_iniciarSesion = await cuentaModel.IniciarSesion(req.body);
            return res.status(200).json({
                  error: false,
                  msg: "Se ha iniciado sesión correctamente",
                  data: consulta_iniciarSesion
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: ''+error.message
            })
      }
};

const perfilUsuario = async(req,res) =>  {
      try{
            const consulta_perfilUsuario = await Cuenta.Perfil(req.query.rut);
            return res.status(200).json({
                  error: false,
                  msg: `Datos del usuario ${req.query.rut}`,
                  data: consulta_perfilUsuario
            });
      }catch(error){
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const modificarUsuario = async(req, res) =>{
      try{
            const consulta_modificarUsuario = await cuentaModel.Modificar(req.body, req.file);
            return res.status(200).json({
                  error: false,
                  msg: "Usuario modificado exitosamente",
                  token: consulta_modificarUsuario
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.cuentaController = {
      mostrarUsuarios,
      registrarUsuario,
      iniciarSesion,
      modificarUsuario,
      perfilUsuario
};