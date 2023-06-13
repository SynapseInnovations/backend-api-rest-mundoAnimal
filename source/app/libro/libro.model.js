const Libro = require("../../class/libro");
const conexion = require("../../database");

const Registrar = async(libro) =>{
      const nuevoLibro = new Libro(libro);
      return nuevoLibro.Registrar();
};

const Mostrar = async() =>{
      const sql = `SELECT * FROM Libro;`;
      return await conexion.query(sql);
};

module.exports.libroModel = {
      Registrar,
      Mostrar
};