const conexion = require("../../database");

const VerificarUsuarioSistema = async (rut) =>{
      let sql_VerificarRut = `
      SELECT NOT EXISTS(SELECT * FROM Cuenta WHERE rut = '${rut}')
      AS Existe;`;
      // Si encuentra, devuelve false (0); 
      let respuesta = await conexion.query(sql_VerificarRut);
      return respuesta[0].Existe;
};

module.exports.cuentaHelper = {
      VerificarUsuarioSistema
};