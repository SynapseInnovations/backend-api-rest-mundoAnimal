const conexion = require("../database");

class Marca {
      constructor({id, nombre}){
            this.nombre = nombre
            this.id = id ? id : 0
      }
      Mostrar = async() =>{
            const sql_Mostrar = `
            SELECT * FROM Marca
            `
            return await conexion.query(sql_Mostrar)
      };

      VerificarExistencia = async() =>{
            const sql_verificarMarca = `
            SELECT EXISTS (SELECT 1 FROM Marca 
            WHERE nombre = ${this.nombre}) as existe;`;
            return await conexion.query(sql_verificarMarca)
      
      };

      Registrar = async() =>{
            const sql_agregarMarca = `
            INSERT INTO Marca (nombre)
            VALUES ('${this.nombre}')`;
            return await conexion.query(sql_agregarMarca);
      };

      Modificar = async() => {
            const sql_ModificarMarca = `
            UPDATE Marca
            SET nombre = '${this.nombre}'
            WHERE (id = ${this.id})
            `
            return await conexion.query(sql_ModificarMarca);
      };

      ObtenerID = async(name) => {
            const sql_id = `SELECT 1 FROM Marca where nombre = '${name}'`
            return await conexion.query(sql_id)
      }

      static Eliminar = async(id) =>{
            const sql_eliminar = `
            DELETE FROM Marca WHERE id= '${id}';
            `;
            return await conexion.query(sql_eliminar)
      }
}

module.exports = Marca;