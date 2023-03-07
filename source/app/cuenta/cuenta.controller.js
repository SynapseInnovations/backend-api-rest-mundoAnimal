const { cuentaModel } = require("./cuenta.model")

const mostrarUsuarios = async(req,res) =>{
      try{
            let consulta_mostrarUsuarios = await cuentaModel.Listar();
            return res.status(200).json({
                  error: false,
                  msg: "Lista de todos los usuarios del sistema",
                  data: consulta_mostrarUsuarios
            });
      }catch(error){
            return res.status(400).json({
              error: true,
              msg: "" + error.message,
            });
      }
};

const registrarUsuario = async(req, res) =>{
      try{
            let consulta_registrarUsuario = await cuentaModel.Registrar(req.body);
            return res.status(200).json({
                  error: false,
                  msg: "Usuario creado exitosamente",
                  token: consulta_registrarUsuario
            });
      }catch(error){
            //console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: ''+error.message
            });
      }
}

const iniciarSesion = async(req,res)=>{
      try{
            let consulta_iniciarSesion = await cuentaModel.IniciarSesion(req.query);
            return res.status(200).json({
                  error: false,
                  msg: "Se ha iniciado sesión correctamente",
                  token: consulta_iniciarSesion
            });
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: ''+error.message
            })
      }
}

module.exports.cuentaController = {
      mostrarUsuarios,
      registrarUsuario,
      iniciarSesion
};