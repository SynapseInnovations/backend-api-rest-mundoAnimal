const conexion = require("../database")

class Venta {
      constructor({ total, fecha, vendedor_rut, tipoventa_id, productos }) {
      (this.total = total),
            (this.fecha = fecha),
            (this.vendedor_rut = vendedor_rut),
            (this.tipoventa_id = tipoventa_id),
            (this.productos = JSON.parse(productos));
      }

      GenerarBoleta = async () => {
      let boleta = {};
      let boletaProductos = [];
      let precio_total = 0;
      this.productos.forEach((i) => {
            let productoObjeto = {};
            productoObjeto.nombre = i.nombre;
            productoObjeto.codigo_barra = i.codigo_barra;
            productoObjeto.precio_neto = i.precio_neto;
            productoObjeto.venta_unitaria = i.isPrecioUnitario;
            productoObjeto.precio_venta = i.isPrecioUnitario
            ? i.precio_unitario
            : i.precio_kilo;
            productoObjeto.cantidad = i.isPrecioUnitario ? i.cantInput : i.kgInput;
            productoObjeto.total_producto =
            productoObjeto.precio_venta * productoObjeto.cantidad;
            productoObjeto.categoria_id = i.categoria_id;
            productoObjeto.marca_id = i.marca_id;
            productoObjeto.mascota_id = i.mascota_id;
            precio_total += productoObjeto.total_producto;
            boletaProductos.push(productoObjeto);
      });
      boleta.productos = boletaProductos;
      boleta.precio_total = precio_total;
      return boleta;
      };

      RegistrarVenta = async (boleta) => {
      const sql_RegistrarVenta = `INSERT INTO Venta (total, fecha, Vendedor_rut, TipoVenta_id)
                  VALUES (${boleta.precio_total},'${this.fecha}','${this.vendedor_rut}',${this.tipoventa_id});`;

      const registroVenta = await conexion.query(sql_RegistrarVenta);
      return registroVenta;
      };

      InsertarVentaProducto = async (numero_boleta, boleta, fecha) => {
      let sql_RegistrarProductoVenta = `INSERT INTO ProductosVenta (codigo_barra, numero_boleta, venta_unitaria, nombre, cantidad, precio_neto, precio_venta, fecha, Categoria_id, Marca_id, Mascota_id) VALUES ?`;

      const values_ProductoVenta = boleta.productos.map((producto) => {
            const venta_unitario = producto.venta_unitaria ? 1 : 0;

            return [
            producto.codigo_barra,
            numero_boleta,
            venta_unitario,
            producto.nombre,
            producto.cantidad,
            producto.precio_neto,
            producto.precio_venta,
            fecha,
            producto.categoria_id,
            producto.marca_id,
            producto.mascota_id,
            ];
      });

      return await conexion.query(sql_RegistrarProductoVenta, [
            values_ProductoVenta,
      ]);
      };

      ActualizarInventario = async (boleta, inventario) => {
      let values_ActualizarInventario = [];
      for (const producto of boleta.productos) {
            if (producto.venta_unitaria) {
            const [inventarioProducto] = inventario.filter(
            (productoInventario) =>
                  productoInventario.codigo_barra === producto.codigo_barra
            );
            values_ActualizarInventario.push([
            inventarioProducto.cantidad - producto.cantidad,
            inventarioProducto.codigo_barra,
            ]);
            }
      }

      if(values_ActualizarInventario.length == 0){
            return
      }
      const sql_ActualizarInventario = `
                  UPDATE Producto 
                  SET cantidad = CASE codigo_barra
                        ${values_ActualizarInventario
                        .map(([cantidad, codigo_barra]) => {
                        if (cantidad !== null) {
                              return `WHEN '${codigo_barra}' THEN ${cantidad}`;
                        } else {
                              return "";
                        }
                        })
                        .join(" ")}
                        ELSE cantidad
                  END`;

      return await conexion.query(sql_ActualizarInventario);
      };

      ChequearInventario = async (inventario) => {
            let respuesta = {};
            for (let i = 0; i < this.productos.length; i++) {
                  let [productoFilter] = inventario.filter(
                  (product) => product.codigo_barra == this.productos[i].codigo_barra
                  );
                  if (productoFilter.unidades < this.productos[i].cantidad) {
                  respuesta.stock = false;
                  respuesta.producto_nombre = productoFilter.nombre;
                  respuesta.cantidad = productoFilter.unidades;
                  return respuesta;
                  }
            }
            respuesta.stock = true;
            return respuesta;
      };

      static ObtenerVenta = async (numero_boleta) => {
            const sql_ObtenerVenta = `
            SELECT codigo_barra, cantidad 
            FROM ProductosVenta 
            WHERE numero_boleta = ${numero_boleta};`;
            return await conexion.query(sql_ObtenerVenta);
      };

      static AnularVenta = async (inventario, venta, numero_boleta) => {
            let values_ActualizarInventario = [];
            for (const producto of venta) {
                  const [inventarioProducto] = inventario.filter(
                        (productoInventario) => productoInventario.codigo_barra === producto.codigo_barra);
                              values_ActualizarInventario.push([
                                    inventarioProducto.cantidad + producto.cantidad,
                                    inventarioProducto.codigo_barra
                              ]);
            }
            const sql_ActualizarInventario = `
            UPDATE Producto 
            SET cantidad = CASE codigo_barra
            ${values_ActualizarInventario.map(([cantidad, codigo_barra]) => {
                  return `WHEN '${codigo_barra}' THEN ${cantidad}`;
            })
            .join(" ")}
            ELSE cantidad
            END;
            `

            await conexion.query(sql_ActualizarInventario);

            const sql_AnularVenta = `
            UPDATE Venta
            SET anulada = ${true}
            WHERE numero_boleta = ${numero_boleta};
            `
            return await conexion.query(sql_AnularVenta)
      };
}

module.exports = Venta;