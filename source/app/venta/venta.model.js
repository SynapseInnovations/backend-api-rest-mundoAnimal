const conexion = require("../../database");
const Venta = require("../../class/venta");
const { productoModel } = require("../producto/producto.model");

const Registrar = async(productos) =>{
      const nuevaVenta = new Venta(productos)
      const inventario = await productoModel.VerProductos();

      const boleta =  await nuevaVenta.GenerarBoleta(inventario);

      if(boleta.precio_total != nuevaVenta.total){
            throw new TypeError(`El precio total ${boleta.precio_total} difiere con el registro calculado (${nuevaVenta.total})`);
      }

      const ventaRegistrada = await nuevaVenta.RegistrarVenta(boleta);
      const ventaProducto   =  await nuevaVenta.InsertarVentaProducto(ventaRegistrada.insertId, boleta);
      await nuevaVenta.ActualizarInventario(boleta, inventario);
      return ventaProducto;
};

const VerVentas = async() =>{

      const sql_VerVentas = `
      SELECT v.*, p.*, vp.*
      FROM Venta v
      JOIN VentaDeProducto vp ON vp.numero_boleta = v.numero_boleta
      JOIN Producto p ON p.codigo_barra = vp.codigo_barra
      `;

      const verVentas = await conexion.query(sql_VerVentas);
      console.log(await verVentas);
      return [await conexion.query(sql_VerVentas)];
};

module.exports.ventaModel = {
      Registrar,
      VerVentas
}