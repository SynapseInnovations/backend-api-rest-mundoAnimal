const conexion = require("../database");

class Categoria {
      constructor({id, nombre}){
            this.nombre = nombre
            this.id = id ? id : 0
      }
      Mostrar = async() =>{
            const sql_Mostrar = `
            SELECT * FROM Categoria
            `
            return await conexion.query(sql_Mostrar)
      };

      VerificarExistencia = async() =>{
            const sql_verificarCategoria = `
            SELECT EXISTS (SELECT 1 FROM Categoria 
            WHERE nombre = ${this.nombre}) as existe;`;
            return await conexion.query(sql_verificarCategoria)
      
      };

      Registrar = async() =>{
            const sql_agregarCategoria = `
            INSERT INTO Categoria (nombre)
            VALUES ('${this.nombre}')`;
            return await conexion.query(sql_agregarCategoria);
      };

      Modificar = async() => {
            const sql_ModificarCategoria = `
            UPDATE Categoria
            SET nombre = '${this.nombre}'
            WHERE (id = ${this.id})
            `
            return await conexion.query(sql_ModificarCategoria);
      };

      ObtenerID = async(name) => {
            const sql_id = `SELECT 1 FROM Categoria where nombre = '${name}'`
            return await conexion.query(sql_id)
      }
}

module.exports = Categoria;