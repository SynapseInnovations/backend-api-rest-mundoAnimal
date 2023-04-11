const { cuentaHelper } = require("../app/cuenta/cuenta.helper");
const Cuenta = require("../class/cuenta");


const CantidadDeCuenta = async(req, res, next) =>{
      try{
            const MaximaCantidadCuentaActivas = 5
            let listaUsuarios = await Cuenta.ListaUsuarios()
            const cantidadUsuariosActivos = await cuentaHelper.ContabilizandoUsuariosActivos(listaUsuarios)
            if (cantidadUsuariosActivos > MaximaCantidadCuentaActivas) {
                  return res.status(403).json({
                        error: true,
                        msg: `Se ha excedido el límite de cuentas activas. (Activas: ${cantidadUsuariosActivos}, Límite: ${MaximaCantidadCuentaActivas})`,
                  });
            }
            next()
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.CuentaMiddleware = {
      CantidadDeCuenta
};