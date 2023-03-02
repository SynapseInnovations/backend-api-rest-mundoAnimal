const conexion = require("../database");

const VerProductos = async() =>{
      let string_sql = `SELECT * FROM Marca`;
      return (await conexion.query(string_sql))
}

module.exports.productoModel = {
      VerProductos
}