const conexion = require("../../database");
const Venta = require("../../class/venta");
const { productoModel } = require("../producto/producto.model");

const Registrar = async(productos) =>{
      const nuevaVenta = new Venta(productos)
      const inventario = await productoModel.VerProductos();

      const boleta =  await nuevaVenta.GenerarBoleta(inventario);

      if(boleta.precio_total != nuevaVenta.total){
            throw new TypeError("El precio total difiere con el registro calculado");
      }

      const ventaRegistrada = await nuevaVenta.RegistrarVenta(boleta);
      return await nuevaVenta.InsertarVentaProducto(ventaRegistrada.insertId, boleta, inventario);
};

const VerVentas = async() =>{
      let sql_VerVentas = `SELECT * FROM Venta`
      return await conexion.query(sql_VerVentas);
};

module.exports.ventaModel = {
      Registrar,
      VerVentas
}