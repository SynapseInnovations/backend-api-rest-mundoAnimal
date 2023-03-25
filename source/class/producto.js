const conexion = require("../database");

class Producto {
      constructor({codigo_barra, nombre, unidades , descripcion, precioKilo, precioUnitario, urlImagen,marca, tipoProducto}){
            
            this.codigo_barra = codigo_barra,
            this.nombre = nombre,
            this.unidades = unidades,
            this.descripcion = descripcion,
            this.precioKilo = precioKilo,
            this.precioUnitario = precioUnitario
            this.urlImagen = urlImagen,
            this.marca = marca,
            this.tipoProducto = tipoProducto
      }

      VerificarExistencia = async() =>{
            const sql_verificarProducto = `
            SELECT EXISTS (SELECT 1 FROM Producto 
            WHERE codigo_barra = ${this.codigoBarra}) as existe;`;
            return await conexion.query(sql_verificarProducto)
      
      };

      Registrar = async() =>{
            const sql_agregarProducto = `
            INSERT INTO Producto (codigo_barra, nombre, unidades, descripcion, precio_kilo, precio_unitario, imagen, Marcas_id_marcas, Tipoproducto_id_tipo)
            VALUES ('${this.codigo_barra}','${this.nombre}',${this.unidades},'${this.descripcion}',${this.precioKilo},${this.precioUnitario},'${this.urlImagen}',${this.marca},${this.tipoProducto})`;
            return await conexion.query(sql_agregarProducto);
      };

}

module.exports = Producto;