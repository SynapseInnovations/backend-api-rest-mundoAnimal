const conexion = require("../database");

class Mascota {
      constructor({id, nombre}){
            this.nombre = nombre
            this.id = id ? id : 0
      }
      Mostrar = async() =>{
            const sql_Mostrar = `
            SELECT * FROM Mascota
            `
            return await conexion.query(sql_Mostrar)
      };

      VerificarExistencia = async() =>{
            const sql_verificarMascota = `
            SELECT EXISTS (SELECT 1 FROM Mascota 
            WHERE nombre = ${this.nombre}) as existe;`;
            return await conexion.query(sql_verificarMascota)
      
      };

      Registrar = async() =>{
            const sql_agregarMascota = `
            INSERT INTO Mascota (nombre)
            VALUES ('${this.nombre}')`;
            return await conexion.query(sql_agregarMascota);
      };

      Modificar = async() => {
            const sql_ModificarMascota = `
            UPDATE Mascota
            SET nombre = '${this.nombre}'
            WHERE (id = ${this.id})
            `
            return await conexion.query(sql_ModificarMascota);
      };

      ObtenerID = async(name) => {
            const sql_id = `SELECT 1 FROM Mascota where nombre = '${name}'`
            return await conexion.query(sql_id)
      }
      static Eliminar = async(id) =>{
            const sql_eliminar = `
            DELETE FROM Mascota WHERE id= '${id}';
            `;
            return await conexion.query(sql_eliminar)
      }
}

module.exports = Mascota;