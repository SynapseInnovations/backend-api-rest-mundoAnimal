const Prestamo = require("../../class/prestamo");
const conexion = require("../../database");

const Registrar = async(prestamo) =>{
      const nuevoPrestamo = new Prestamo(prestamo);
      return nuevoPrestamo.Prestar();
};

const Mostrar = async() =>{
      const sql = `
      SELECT * FROM Prestamo
      INNER JOIN Cuenta ON Cuenta.rut = Prestamo.rut
      INNER JOIN Libro ON Libro.codigo_barra = Prestamo.codigo_barra
      `;
      return await conexion.query(sql);
};

module.exports.prestamoModel = {
      Registrar,
      Mostrar
}
