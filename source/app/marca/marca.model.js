const Marca = require("../../class/marca");
const conexion = require("../../database")

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Marca
      `
      return await conexion.query(sql_Mostrar)
};
const Registrar = async(marca) => {
      const newMarca = new Marca(marca)
      
      return await newMarca.Registrar();
};

const Modificar = async(marca) =>{
      const newMarca = new Marca(marca)
      return await newMarca.Modificar();
};

const Eliminar = async() => {

};

module.exports.marcaModel = {
      Registrar,
      Mostrar,
      Modificar,
      Eliminar
}