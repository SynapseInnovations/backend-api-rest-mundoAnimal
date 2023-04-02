const conexion = require("../database")

class Venta {
      constructor({ total, fecha, vendedor_rut, tipoventa_id, productos }) {
            this.total = total,
            this.fecha = fecha,
            this.vendedor_rut = vendedor_rut,
            this.tipoventa_id = tipoventa_id,
            this.productos = JSON.parse(productos)
      }

      GenerarBoleta = async(inventario) =>{
            let boleta = {}
            let boletaProductos = []
            let precio_total = 0;
            this.productos.forEach(i => {
                  let productoObjeto = {};
                  productoObjeto.nombre = i.nombre
                  productoObjeto.codigo_barra = i.codigo_barra
                  if(i.isPrecioUnitario){
                                                            //TODO: UNITARIO
                        productoObjeto.venta_unitaria = true;
                        productoObjeto.cantidad =  i.cantInput
                        productoObjeto.precio_unitario = i.precio_unitario
                        productoObjeto.precio_producto = i.cantInput * i.precio_unitario

                  }else{                              //TODO:KILO
                        productoObjeto.venta_unitaria = false;
                        productoObjeto.kilo = i.kgInput
                        productoObjeto.precio_kilo = i.precio_kilo
                        productoObjeto.precio_producto = i.kgInput * i.precio_kilo
                  }
                  precio_total += productoObjeto.precio_producto;
                  boletaProductos.push(productoObjeto);
            });
            boleta.productos = boletaProductos
            boleta.precio_total = precio_total
            return boleta;
      };

      RegistrarVenta = async(boleta) =>{
            const sql_RegistrarVenta = `INSERT INTO Venta (total, fecha, Vendedor_rut, TipoVenta_id)
            VALUES (${boleta.precio_total},'${this.fecha}','${this.vendedor_rut}',${this.tipoventa_id});`;
      
            const registroVenta = await conexion.query(sql_RegistrarVenta);
            return registroVenta;
      };

      InsertarVentaProducto = async(numero_boleta, boleta) =>{
            let sql_RegistrarProductoVenta = `INSERT INTO VentaDeProducto (numero_boleta, codigo_barra, venta_unitaria, cantidad, kilos) VALUES ?`;

            const values_ProductoVenta = boleta.productos.map(producto => {
                  const venta_unitario = producto.venta_unitaria ? 1 : 0;
                  const cantidad = producto.venta_unitaria ? producto.cantidad : null;
                  const kilos = producto.venta_unitaria ? null : producto.kilo;

                  return [numero_boleta, producto.codigo_barra, venta_unitario, cantidad, kilos]
            });
            
            return await conexion.query(sql_RegistrarProductoVenta, [values_ProductoVenta]);
      };

      ActualizarInventario = async (boleta, inventario)=>{

            let values_ActualizarInventario = [];
            for (const producto of boleta.productos) {
                  if (producto.venta_unitaria) {
                        const [inventarioProducto] = inventario.filter( productoInventario => productoInventario.codigo_barra === producto.codigo_barra)
                        values_ActualizarInventario.push([inventarioProducto.unidades-producto.cantidad,inventarioProducto.codigo_barra])
                  }
            }

            const sql_ActualizarInventario = `
            UPDATE Producto 
            SET unidades = CASE codigo_barra
                  ${values_ActualizarInventario.map(([unidades, codigo_barra]) => {
                        if (unidades !== null) {
                              return `WHEN '${codigo_barra}' THEN ${unidades}`;
                        } else {
                              return '';
                        }
                  }).join(' ')}
                  ELSE unidades
            END`;

            return await conexion.query(sql_ActualizarInventario);
      };

      ChequearInventario = async(inventario)=>{
            let respuesta = {};
            for(let i = 0; i < this.productos.length ;i++){
                  let [productoFilter] = inventario.filter( product => product.codigo_barra == this.productos[i].codigo_barra )
                  if (productoFilter.unidades < this.productos[i].cantidad){
                        respuesta.stock = false;
                        respuesta.producto_nombre = productoFilter.nombre
                        respuesta.cantidad = productoFilter.unidades
                        return respuesta;
                  }
            }
            respuesta.stock = true;
            return respuesta;
      };
}

module.exports = Venta;