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

      InsertarVentaProducto = async(numero_boleta, boleta, inventario) =>{
            let sql_ActualizarInventario = `UPDATE Producto SET unidades = ? WHERE codigo_barra = ?`;

            let values_ProductoVenta = [];
            let values_AI = new Array();
            let values_AI2 = new Array();

            for(let i=0; i < boleta.productos.length ;i++){
                  
                  let [valuesFilter] = inventario.filter( (producto) => producto.codigo_barra == boleta.productos[i].codigo_barra );

                  let values_PV = new Array();

                  values_PV.push(numero_boleta);
                  values_PV.push(boleta.productos[i].codigo_barra);
                  

                  if(boleta.productos[i].venta_unitaria){

                        values_AI.push([valuesFilter.unidades - boleta.productos[i].cantidad])
                        values_AI2.push([boleta.productos[i].codigo_barra]);

                  }else{
                        values_PV.push(0);
                        values_PV.push(null);
                        values_PV.push(boleta.productos[i].kilo);
                  }
                  values_ProductoVenta.push(values_PV);
            }
            const ActualizarInventario = await conexion.query(sql_ActualizarInventario, [...values_AI,...values_AI2]);
            return ActualizarInventario;
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

      DescuentoInventario = async ()=>{

      };
}

module.exports = Venta;