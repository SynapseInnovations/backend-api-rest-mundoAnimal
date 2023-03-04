const { cuentaModel } = require("./cuenta.model")

const mostrarUsuarios = async(req,res) =>{
      try{
            let consulta_mostrarUsuarios = await cuentaModel.Listar();
            return res.json({
                  error: false,
                  msg: "Lista de todos los usuarios del sistema",
                  data: consulta_mostrarUsuarios,
            });
      }catch(error){
            return res.json({
                  error: true,
                  msg: ''+error
            });
      }
};

const registrarUsuario = async(req, res) =>{
      try{
            let consulta_registrarUsuario = await cuentaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: "Usuario creado exitosamente",
                  data: consulta_registrarUsuario
            });
      }catch(error){
            return res.json({
                  error: true,
                  msg: ''+error
            });
      }
}

module.exports.cuentaController = {
      mostrarUsuarios,
      registrarUsuario
};