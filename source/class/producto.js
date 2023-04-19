const conexion = require("../database");

class Producto {
      constructor({codigo_barra, nombre, cantidad , descripcion, precio_neto, precio_kilo, precio_unitario, imagen, fecha, marca_id, categoria_id, mascota_id}, rut){
            
            this.codigo_barra = codigo_barra,
            this.nombre = nombre,
            this.cantidad = cantidad,
            this.descripcion = descripcion,
            this.precio_neto = precio_neto,
            this.precio_kilo = precio_kilo,
            this.precio_unitario = precio_unitario
            this.imagen = imagen,
            this.fecha = fecha,
            this.marca_id = marca_id,
            this.categoria_id = categoria_id
            this.mascota_id = mascota_id
            this.rut = rut
      }

      VerificarExistencia = async() =>{
            const sql_verificarProducto = `
            SELECT EXISTS (SELECT 1 FROM Producto 
            WHERE codigo_barra = ${this.codigo_barra}) as existe;`;
            return await conexion.query(sql_verificarProducto)
      
      };

      Registrar = async() =>{
            const sql_agregarProducto = `
            INSERT INTO Producto (codigo_barra, nombre, cantidad, descripcion, precio_neto, precio_kilo, precio_unitario, imagen, fecha, Marca_id, Categoria_id, Mascota_id, Cuenta_rut)
            VALUES ('${this.codigo_barra}','${this.nombre}',${this.cantidad},'${this.descripcion}',${this.precio_neto},${this.precio_kilo},${this.precio_unitario},'${this.imagen}','${this.fecha}',${this.marca_id},${this.categoria_id},${this.mascota_id}, '${this.rut}')`;
            return await conexion.query(sql_agregarProducto);
      };

      Modificar = async(imgModificado) => {
            let sql_ModificarProducto = `
            UPDATE Producto
            SET nombre = '${this.nombre}', cantidad = '${this.cantidad}', descripcion = '${this.descripcion}', 
            precio_kilo = '${this.precio_kilo}', precio_unitario = '${this.precio_unitario}', precio_neto = '${this.precio_neto}', 
            fecha = '${this.fecha}', 
            Marca_id = '${this.marca_id}', Categoria_id = '${this.categoria_id}',
            Mascota_id = '${this.mascota_id}', Cuenta_rut = '${this.rut}'`
            if(imgModificado){
                  sql_ModificarProducto +=`, imagen = '${this.imagen}' `
            }
            sql_ModificarProducto += `WHERE codigo_barra = '${this.codigo_barra}'
            `;
            return await conexion.query(sql_ModificarProducto);
      };

      static Borrar = async(codigo) =>{
            const sql_eliminarProducto = `
            DELETE FROM Producto 
            WHERE codigo_barra = '${codigo}'`;
            return await conexion.query(sql_eliminarProducto);
      };

}

module.exports = Producto;