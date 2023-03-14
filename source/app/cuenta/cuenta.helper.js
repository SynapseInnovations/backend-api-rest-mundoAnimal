const conexion = require("../../database");

const VerificarUsuarioSistema = async (rut) =>{
      let sql_VerificarRut = `
      SELECT NOT EXISTS(SELECT * FROM Cuenta WHERE rut = '${rut}')
      AS Existe;`;
      // Si encuentra, devuelve false (0); 
      let respuesta = await conexion.query(sql_VerificarRut);
      return respuesta[0].Existe;
};

const DatosUsuario = async(rut) =>{
      let sql_Usuario = `
      SELECT Cuenta.nombre as 'Nombre', Cuenta.rut as 'RUT', Rol.nombre AS 'Rol' FROM Cuenta
      INNER JOIN RolesDeCuenta ON Cuenta.rut = RolesDeCuenta.Cuenta_rut
      INNER JOIN Rol ON RolesDeCuenta.Roles_id_rol = Rol.id_rol
      WHERE Cuenta.rut = '${rut}';`;
      
      return await conexion.query(sql_Usuario);
};

const PerfilUsuario = async(rut) =>{
      let sql_PerfilUsuario = `
      SELECT * FROM Cuenta
      WHERE rut = '${rut}'
      `
      return await conexion.query(sql_PerfilUsuario);
}

module.exports.cuentaHelper = {
      VerificarUsuarioSistema,
      DatosUsuario,
      PerfilUsuario
};