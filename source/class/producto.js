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
            let processedImageUrl = null;
            //proceso de transformar el string de imagen en base64   (Enviar:base64->Transformar:archivo.png)
            //guardar archivo en el api (Crear directorio)
            //obtener ruta a ese archivo
            //cambiar urlImage a dicha ruta
            //console.log(this.urlImagen);
            this.imagen = processedImageUrl ? processedImageUrl : "https://i.imgur.com/EBH7aDM.png";
            const sql_agregarProducto = `
            INSERT INTO Producto (codigo_barra, nombre, unidades, descripcion, precio_kilo, precio_unitario, imagen, Marca_id, Categoria_id)
            VALUES ('${this.codigo_barra}','${this.nombre}',${this.unidades},'${this.descripcion}',${this.precio_kilo},${this.precio_unitario},'${this.imagen}',${this.marca_id},${this.categoria_id})`;
            return await conexion.query(sql_agregarProducto);
      };

}

module.exports = Producto;