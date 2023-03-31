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
const registrarCategoria = async(req, res) =>{
      try{
            console.log(req)
            const consulta_insercionCategoria = await categoriaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado la categoria de forma exitosa",
                  data: consulta_insercionCategoria
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
            const consulta_modificarCategoria = await categoriaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la categoria ${req.body.id}`,
                  data: consulta_modificarCategoria
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
      modificarCategoria
}