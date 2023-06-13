const conexion = require("../database");

class Libro{
      constructor({codigo_barra, titulo, autor, editorial, anio_publicacion, cantidad}){
            this.codigo_barra = codigo_barra,
            this.titulo = titulo,
            this.autor = autor,
            this.editorial = editorial,
            this.anio_publicacion = anio_publicacion,
            this.cantidad = cantidad
      }

      Registrar = async() =>{
            const sql = `
            INSERT INTO Libro (codigo_barra, titulo, autor, editorial, anio_publicacion, cantidad)
            VALUES ('${this.codigo_barra}', '${this.titulo}', '${this.autor}', '${this.editorial}', '${this.anio_publicacion}', '${this.cantidad}')`;
            return await conexion.query(sql)
      }
}

module.exports = Libro;