const Producto = require("../../class/producto");
const conexion = require("../../database");

const Agregar = async(producto) => {
      const nuevoProducto = new Producto(producto)
      if (!await nuevoProducto.VerificarExistencia()) {
            throw new TypeError("El producto ya existe.");
      }
      return await nuevoProducto.Registrar();
};

const VerProductos = async() =>{
      let sql_verProducto = `SELECT * FROM Producto`;
      return await conexion.query(sql_verProducto);
};

const Eliminar = async(codigo) => {
      let sql_eliminarProducto = `
      DELETE FROM Producto 
      WHERE codigo_barra = '${codigo}'`;
      return await conexion.query(sql_eliminarProducto);
}

module.exports.productoModel = {
      Agregar,
      VerProductos,
      Eliminar
}