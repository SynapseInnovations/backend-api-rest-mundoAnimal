const conexion = require("../../database");

const VerificarUsuarioSistema = async (rut) =>{
      let sql_VerificarRut = `
      SELECT NOT EXISTS(SELECT * FROM Cuenta WHERE rut = '${rut}')
      AS Existe;`;
      // Si encuentra, devuelve false (0); 
      let respuesta = await conexion.query(sql_VerificarRut);
      return respuesta[0].Existe;
};

const ContabilizandoUsuariosActivos = async(listaUsuarios) =>{
      let listaFiltrada = listaUsuarios.filter( usuario => usuario.Rol_id != 3);
      return listaFiltrada.length;
};

module.exports.cuentaHelper = {
      VerificarUsuarioSistema,
      ContabilizandoUsuariosActivos
};