const GenerandoListaVentas = async(verVentas) =>{
      const ProductosVendidos = verVentas.reduce((venta, actual) =>{
            venta[actual.numero_boleta] = venta[actual.numero_boleta] || {
                  numero_boleta: actual.numero_boleta,
                  total: actual.total,
                  fecha: actual.fecha,
                  vendedor_rut: actual.Vendedor_rut,
                  tipo_venta: actual.TipoVenta_id,
                  productos: []
            };
            venta[actual.numero_boleta].productos.push({
                  codigo_barra: actual.codigo_barra,
                  nombre: actual.nombre,
                  ...(actual.cantidad != null && { cantidad: actual.cantidad, precio: actual.precio_unitario }),
                  ...(actual.kilos != null && { kilos: actual.kilos, precio: actual.precio_kilo }),
                  total: actual.venta_unitaria ? actual.cantidad * actual.precio_unitario : actual.kilos * actual.precio_kilo
            });

            return venta;
      },[]).filter(Boolean);
      return ProductosVendidos;
};

module.exports.ventaHelper = {
      GenerandoListaVentas,
};