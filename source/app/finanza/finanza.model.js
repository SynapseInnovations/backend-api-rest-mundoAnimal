const { TokenExpiredError } = require("jsonwebtoken");
const conexion = require("../../database");

const VerVentas = async(query) =>{
    let sql_VerVentas = `SELECT * FROM Venta`;
    let tipo = ""
    switch(query.tipo){
        case "day":
            tipo="Día"
            sql_VerVentas += ` WHERE DAY(fecha) = '${query.valor}'`
            break
        case "month":
            sql_VerVentas += ` WHERE MONTH(fecha) = '${query.valor}'`
            tipo="Mes"
            break
        case "year":
            sql_VerVentas += ` WHERE YEAR(fecha) = '${query.valor}'`
            tipo="Año"
            break
        default:

    }
      
      sql_VerVentas += ` ORDER BY numero_boleta DESC`
      const verVentas = await conexion.query(sql_VerVentas);
      const v = verVentas.map(i => {return {...i, type:tipo}})
      let total_anulado = 0
      let total_no_anulado = 0
      verVentas.forEach(e => {
        if(Boolean(e.anulada)){
            total_anulado += e.total
        }
        else{
            total_no_anulado += e.total
        }
      });
      return {tipoFiltro:tipo, totalAnulado:total_anulado, totalNoAnulado: total_no_anulado, ventas:v};
};

module.exports.finanzaModel = {
      VerVentas
}