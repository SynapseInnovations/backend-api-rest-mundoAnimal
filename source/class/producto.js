const conexion = require("../database");

class Producto {
      constructor({codigo_barra, nombre, unidades , descripcion, precio_kilo, precio_unitario, imagen,marca_id, categoria_id}){
            
            this.codigo_barra = codigo_barra,
            this.nombre = nombre,
            this.unidades = unidades,
            this.descripcion = descripcion,
            this.precio_kilo = precio_kilo,
            this.precio_unitario = precio_unitario
            this.imagen = imagen,
            this.marca_id = marca_id,
            this.categoria_id = categoria_id
      }

      VerificarExistencia = async() =>{
            const sql_verificarProducto = `
            SELECT EXISTS (SELECT 1 FROM Producto 
            WHERE codigo_barra = ${this.codigo_barra}) as existe;`;
            return await conexion.query(sql_verificarProducto)
      
      };

      Registrar = async() =>{
            const sql_agregarProducto = `
            INSERT INTO Producto (codigo_barra, nombre, unidades, descripcion, precio_kilo, precio_unitario, imagen, Marca_id, Categoria_id)
            VALUES ('${this.codigo_barra}','${this.nombre}',${this.unidades},'${this.descripcion}',${this.precio_kilo},${this.precio_unitario},'${this.imagen}',${this.marca_id},${this.categoria_id})`;
            return await conexion.query(sql_agregarProducto);
      };

      Modificar = async() => {
            const sql_ModificarProducto = `
            UPDATE Producto
            SET nombre = '${this.nombre}', unidades = '${this.unidades}', 
            descripcion = '${this.descripcion}', precio_kilo = '${this.precio_kilo}', 
            precio_unitario = '${this.precio_unitario}', imagen = '${this.imagen}', 
            Marca_id = '${this.marca_id}', Categoria_id = '${this.categoria_id}'
            WHERE codigo_barra = '${this.codigo_barra}'
            `
            return await conexion.query(sql_ModificarProducto);
      };
}

module.exports = Producto;