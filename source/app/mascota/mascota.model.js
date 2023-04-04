const Mascota = require("../../class/mascota");
const conexion = require("../../database")

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Mascota
      `
      return await conexion.query(sql_Mostrar)
};
const Registrar = async(mascota) => {
      const newMascota = new Mascota(mascota)
      
      return await newMascota.Registrar();
};

const Modificar = async(mascota) =>{
      const newMascota = new Mascota(mascota)
      return await newMascota.Modificar();
};
module.exports.mascotaModel = {
      Mostrar,
      Registrar,
      Modificar
}