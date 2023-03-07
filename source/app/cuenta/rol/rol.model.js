const conexion = require("../../../database");

const AsignarRol = async(rut) => {
      // Ver como juntar estas 2 query xd
      let sql_RolUsuario = `
      SELECT * FROM Rol
      WHERE nombre = 'Usuario'
      `;

      let res_RolUsuario = await conexion.query(sql_RolUsuario);
      
      let sql_AsignarRol = `
      INSERT INTO RolesDeCuenta (Roles_id_rol, Cuenta_rut) 
      VALUES (${res_RolUsuario[0].id_rol},'${rut}');`;
      await conexion.query(sql_AsignarRol);
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