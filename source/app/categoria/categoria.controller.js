const { categoriaModel } = require("./categoria.model");

const mostrarCategorias = async(req, res) => {
      try{
            const listaCategorias = await categoriaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de todas las categorias disponible",
                  data: listaCategorias
            });
      }catch(error){
            console.log(error)
            return res.status(400).json({
                  error: true,
                  msg: ''+ error.message
            });
      }
};




module.exports.categoriasController = {
      mostrarCategorias
}