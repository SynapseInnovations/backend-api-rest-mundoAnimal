const conexion = require("../../../database");

const AsignarRol = async(rut, rol) => {
      let sql_AsignarRol = `
      INSERT INTO RolesDeCuenta (Roles_id_rol, Cuenta_rut) 
      SELECT id_rol, '${rut}' FROM Rol WHERE nombre = '${rol}';
      `;
      return await conexion.query(sql_AsignarRol);
};

const ObtenerRol = async(rut) => {
      let sql_ObtenerRol = `
            SELECT c.rut, c.clave, r.nombre
            FROM Cuenta AS c
            INNER JOIN RolesDeCuenta AS rc ON c.rut = rc.Cuenta_rut
            INNER JOIN Rol AS r ON rc.Roles_id_rol = r.id_rol
            WHERE c.rut = '${rut}'
            `;
      
      return (await conexion.query(sql_ObtenerRol))[0];
}

module.exports.rolModel = {
      AsignarRol,
      ObtenerRol,
};