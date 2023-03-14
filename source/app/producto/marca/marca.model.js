const conexion = require("../../../database");

const Registrar = async(marca) => {
      let sql_registrarMarca = 
      `INSERT INTO Marca (nombre, logo) 
      VALUES ('${marca.nombre}','${marca.logo}');
      `
      await conexion.query(sql_registrarMarca);
};

const MostrarTodo = async() => {
      let sql_mostrarTodo = 
      `
      SELECT * FROM Marca;
      `
      return await conexion.query(sql_mostrarTodo);
};

const Modificar = async() => {
      let sql_modificarMarca = 
      `UPDATE Marca 
      SET nombre = ''
      `
      //UPDATE usuarios SET correo = 'nuevo_correo@example.com' 
      //WHERE id = 1234;

};

const Eliminar = async() => {

};

module.exports.marcaModel = {
      Registrar,
      MostrarTodo,
      Modificar,
      Eliminar
}