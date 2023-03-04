const conexion = require("../../database");

const VerificarUsuario = async (rut) =>{
      let sql_verificarUsuario = `
      SELECT * FROM Cuenta
      WHERE '${rut}' = rut;
      `
      try{
            let respuesta = await conexion.query(sql_verificarUsuario)
            if (respuesta.length == 0) {
                  return false;
            } else {
                  return true;
            }
      }catch(error){
            console.log(error);
            return true;
      }
};

module.exports.cuentaHelper = {
      VerificarUsuario
};