const conexion = require("../database");

class Animal {
      constructor({id, nombre}){
            this.nombre = nombre
            this.id = id ? id : 0
      }
      Mostrar = async() =>{
            const sql_Mostrar = `
            SELECT * FROM Animal
            `
            return await conexion.query(sql_Mostrar)
      };

      VerificarExistencia = async() =>{
            const sql_verificarAnimal = `
            SELECT EXISTS (SELECT 1 FROM Animal 
            WHERE nombre = ${this.nombre}) as existe;`;
            return await conexion.query(sql_verificarAnimal)
      
      };

      Registrar = async() =>{
            const sql_agregarAnimal = `
            INSERT INTO Animal (nombre)
            VALUES ('${this.nombre}')`;
            return await conexion.query(sql_agregarAnimal);
      };

      Modificar = async() => {
            const sql_ModificarAnimal = `
            UPDATE Animal
            SET nombre = '${this.nombre}'
            WHERE (id = ${this.id})
            `
            return await conexion.query(sql_ModificarAnimal);
      };

      ObtenerID = async(name) => {
            const sql_id = `SELECT 1 FROM Animal where nombre = '${name}'`
            return await conexion.query(sql_id)
      }
}

module.exports = Animal;