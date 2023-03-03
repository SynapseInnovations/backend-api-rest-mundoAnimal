const conexion = require("../../database");

const VerificarProducto = async (codigoBarra) => {
      let sql_verificarProducto = `
      SELECT * FROM ${process.env.NOMBRE_BD}.Producto
      WHERE ${codigoBarra} = codigo_barra;`;

      try{
            let respuesta = await conexion.query(sql_verificarProducto);
            if(respuesta.length == 0){
                  return false;
            }
            else {
                  return true;
            }

      }catch(error){
            console.log(error);
            return true;
      }
};


module.exports.productoHelper = {
      VerificarProducto
}