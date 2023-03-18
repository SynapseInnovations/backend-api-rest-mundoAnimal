const conexion = require("../../database");

const Registrar = async(productos) =>{
      
};

const VerVentas = async() =>{
      let sql_VerVentas = `SELECT * FROM Venta`
      return await conexion.query(sql_VerVentas);
};

module.exports.ventaModel = {
      Registrar,
      VerVentas
}