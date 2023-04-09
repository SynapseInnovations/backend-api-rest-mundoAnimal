const conexion = require("../../database");
const { ventaHelper } = require("./venta.helper");
const Venta = require("../../class/venta");
const { productoModel } = require("../producto/producto.model");

const Registrar = async(productos) =>{
      const nuevaVenta = new Venta(productos)
      const inventario = await productoModel.VerProductos();

      const boleta =  await nuevaVenta.GenerarBoleta();

      if(boleta.precio_total != nuevaVenta.total){
            throw new TypeError(`El precio total ${boleta.precio_total} difiere con el registro calculado (${nuevaVenta.total})`);
      }

      const ventaRegistrada = await nuevaVenta.RegistrarVenta(boleta);
      const ventaProducto   =  await nuevaVenta.InsertarVentaProducto(ventaRegistrada.insertId, boleta, nuevaVenta.fecha);
      await nuevaVenta.ActualizarInventario(boleta, inventario);
      return ventaProducto;
};

const VerVentas = async() =>{

      const sql_VerVentas = `
      SELECT V.*,  
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id,
      'codigo_barra', codigo_barra,
      'numero_boleta', numero_boleta,
      'venta_unitaria', venta_unitaria,
      'nombre', nombre,
      'cantidad', cantidad,
      'precio_neto', precio_neto,
      'precio_venta', precio_venta,
      'Categoria_id', Categoria_id,
      'Marca_id', Marca_id,
      'Mascota_id', Mascota_id)) 
      FROM ProductosVenta PV
      WHERE PV.numero_boleta = V.numero_boleta) as productos
      FROM Venta V ORDER BY V.numero_boleta DESC
      `;
      const verVentas = await conexion.query(sql_VerVentas);
      return verVentas;
};

const Eliminar = async(numero_boleta) =>{
      const inventario = await productoModel.VerProductos();
      const venta = await Venta.ObtenerVenta(numero_boleta);
      return await Venta.AnularVenta(inventario, venta, numero_boleta)
}

module.exports.ventaModel = {
      Registrar,
      VerVentas,
      Eliminar
}