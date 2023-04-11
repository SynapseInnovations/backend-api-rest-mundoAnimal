const Mascota = require("../../class/mascota");
const { mascotaModel } = require("./mascota.model");

const mostrarMascotas = async(req, res) => {
      try{
            const query = await mascotaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de mascotas cargada exitosamente.",
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
const registrarMascota = async(req, res) =>{
      try{
            const query = await mascotaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: `Se ha ingresado la mascota de forma exitosa.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarMascota = async(req, res) =>{
      try{
            const query = await mascotaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la mascota.`,
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

const eliminarMascota = async(req, res) =>{
      try{
            const query = await Mascota.Eliminar(req.query.id)
            return res.json({
                  error: false,
                  msg: `Se ha eliminado con exito la mascota.`,
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

module.exports.mascotaController = {
      mostrarMascotas,
      registrarMascota,
      modificarMascota,
      eliminarMascota
}