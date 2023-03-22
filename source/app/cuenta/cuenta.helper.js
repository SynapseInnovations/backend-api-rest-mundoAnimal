const conexion = require("../../database");

const VerificarUsuarioSistema = async (rut) =>{
      let sql_VerificarRut = `
      SELECT NOT EXISTS(SELECT * FROM Cuenta WHERE rut = '${rut}')
      AS Existe;`;
      // Si encuentra, devuelve false (0); 
      let respuesta = await conexion.query(sql_VerificarRut);
      return respuesta[0].Existe;
};

const PerfilUsuario = async(rut) =>{
      let sql_PerfilUsuario = `
      SELECT * FROM Cuenta
      WHERE rut = '${rut}'
      `
      return await conexion.query(sql_PerfilUsuario);
};

module.exports.cuentaHelper = {
      VerificarUsuarioSistema,
      PerfilUsuario
};