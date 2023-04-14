const { finanzaModel  } = require("./finanza.model");

const mostrarVentas = async(req, res) =>{
      try {
            const query = await finanzaModel.VerVentas(req.query);
            return res.status(200).json({
                  error: false,
                  msg: `Lista de ventas cargada exitosamente.`,
                  data: query
            });
      } catch (error) {
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.finanzaController = {
      mostrarVentas
}
