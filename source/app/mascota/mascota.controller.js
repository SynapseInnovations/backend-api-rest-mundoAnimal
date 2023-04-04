const { mascotaModel } = require("./mascota.model");

const mostrarMascotas = async(req, res) => {
      try{
            const listaMascotas = await mascotaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de todas las mascotas disponibles",
                  data: listaMascotas
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
            const consulta_insercionMascota = await mascotaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado la mascota de forma exitosa",
                  data: consulta_insercionMascota
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarMascota = async(req, res) =>{
      try{
            const consulta_modificarMascota = await mascotaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la mascota ${req.body.id}`,
                  data: consulta_modificarMascota
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
      modificarMascota
}