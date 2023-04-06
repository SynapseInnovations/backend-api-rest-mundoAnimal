const { cuentaModel } = require("./cuenta.model");
const Cuenta = require("../../class/cuenta");

const mostrarUsuarios = async(req,res) =>{
      try{
            const query = await Cuenta.ListaUsuarios();
            return res.status(200).json({
                  error: false,
                  msg: "Lista de todos los usuarios cargada exitosamente.",
                  data: query
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
            let query = await cuentaModel.Registrar(req.body, req.file);
            return res.status(200).json({
                  error: false,
                  msg: `Se ha ingresado la categoria ${req.body.rut} de forma exitosa.`,
                  token: query
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
            let query = await cuentaModel.IniciarSesion(req.body);
            return res.status(200).json({
                  error: false,
                  msg: "Se ha iniciado sesión correctamente.",
                  data: query
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
            const query = await Cuenta.Perfil(req.query.rut);
            return res.status(200).json({
                  error: false,
                  msg: `Datos del usuario ${req.query.rut} cargados exitosamente.`,
                  data: query
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
            const query = await cuentaModel.Modificar(req.body, req.file);
            return res.status(200).json({
                  error: false,
                  msg: `Se ha modificado con exito el usuario ${req.body.rut}.`,
                  token: query
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarUsuario = async(req, res) => {
      try{
            const query = await cuentaModel.Eliminar(req.query.rut);
            return res.status(200).json({
                  error: false,
                  msg: `Se ha eliminado con exito el usuario.`,
                  token: query
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
}

module.exports.cuentaController = {
      mostrarUsuarios,
      registrarUsuario,
      iniciarSesion,
      modificarUsuario,
      perfilUsuario,
      eliminarUsuario
};