const Categoria = require("../../class/categoria");
const conexion = require("../../database")

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Categoria
      `
      return await conexion.query(sql_Mostrar)
};
const Registrar = async(categoria) => {
      const newCategoria = new Categoria(categoria)
      
      return await newCategoria.Registrar();
};

const Modificar = async(categoria) =>{
      const newCategoria = new Categoria(categoria)
      return await newCategoria.Modificar();
};
module.exports.categoriaModel = {
      Mostrar,
      Registrar,
      Modificar
}