const conexion = require("../database")

class Venta {
      constructor({ total, fecha, vendedor_rut, tipoventa_id, productos }) {
            this.total = total,
            this.fecha = fecha,
            this.vendedor_rut = vendedor_rut,
            this.tipoventa_id = tipoventa_id,
            this.productos = productos
      }

      GenerarBoleta = async(inventario) =>{
            let boleta = {}
            let boletaProductos = []
            let precio_total = 0;

            for(let i = 0; i < this.productos.length ; i++ ){
                  let [productoFilter] = inventario.filter( product => product.codigo_barra == this.productos[i].codigo_barra )
                  let productoObjeto = {};
                  productoObjeto.nombre = productoFilter.nombre
                  productoObjeto.codigo_barra = productoFilter.codigo_barra
                  if(this.productos[i].unitario){     //TODO: UNITARIO
                        productoObjeto.venta_unitaria = true;
                        productoObjeto.cantidad =  this.productos[i].cantidad
                        productoObjeto.precio_unitario = productoFilter.precio_unitario
                        productoObjeto.precio_producto = productoObjeto.cantidad * productoFilter.precio_unitario

                  }else{                              //TODO:KILO
                        productoObjeto.venta_unitaria = false;
                        productoObjeto.kilo = this.productos[i].kilo
                        productoObjeto.precio_kilo = productoFilter.precio_kilo
                        productoObjeto.precio_producto = productoObjeto.kilo * productoFilter.precio_kilo
                  }
                  precio_total = productoObjeto.precio_producto + precio_total;
                  boletaProductos.push(productoObjeto);
            }
            
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

            let sql_values = new Array();
            for(let i=0; i < boleta.productos.length ;i++){
                  let values = new Array()
                  values.push(numero_boleta);
                  values.push(boleta.productos[i].codigo_barra);
                  if(boleta.productos[i].venta_unitaria){
                        values.push(1);
                        values.push(boleta.productos[i].cantidad);
                        values.push(null)
                  }else{
                        values.push(0);
                        values.push(null);
                        values.push(boleta.productos[i].kilo);
                  }
                  sql_values.push(values);
            }
            return await conexion.query(sql_RegistrarProductoVenta, [sql_values])
      };
}

module.exports = Venta;