const conexion = require("../database");

class Prestamo{
      constructor({rut, codigo_barra, fecha_prestamo, fecha_devolucion, estado}){
            this.rut = rut,
            this.codigo_barra = codigo_barra,
            this.fecha_prestamo = fecha_prestamo,
            this.fecha_devolucion = fecha_devolucion
            this.estado = estado
      }

      Prestar = async () =>{
            //PD: me dio flojera hacer el verificar cantidad de libro
            const sqlInsertarLibro = `
            INSERT INTO Prestamo (rut, codigo_barra, fecha_prestamo, fecha_devolucion, estado)
            VALUES ('${this.rut}', '${this.codigo_barra}', '${this.fecha_prestamo}', '${this.fecha_devolucion}', '${this.estado}')`;
            await conexion.query(sqlInsertarLibro);

            const sqlModificarLibro = `
            UPDATE Libro SET cantidad = cantidad - 1 
            WHERE codigo_barra = '${this.codigo_barra}'`;
            return await conexion.query(sqlModificarLibro);
      };
}

module.exports = Prestamo;