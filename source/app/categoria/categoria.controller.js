const { categoriaModel } = require("./categoria.model");
const Categoria = require("../../class/categoria");

const mostrarCategorias = async(req, res) => {
      try{
            const query = await categoriaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de categorías cargada exitosamente.",
                  data: query
            });
      }catch(error){
            console.log(error)
            return res.status(400).json({
                  error: true,
                  msg: ''+ error.message
            });
      }
};
const registrarCategoria = async(req, res) =>{
      try{
            const query = await categoriaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: `Se ha ingresado la categoria de forma exitosa.`,
                  data: query
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarCategoria = async(req, res) =>{
      try{
            const query = await categoriaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la categoría.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarCategoria = async(req, res) =>{
      try{
            const query = await Categoria.Eliminar(req.query.id)
            return res.json({
                  error: false,
                  msg: `Se ha eliminado con exito la categoria.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.categoriasController = {
      mostrarCategorias,
      registrarCategoria,
      modificarCategoria,
      eliminarCategoria
}