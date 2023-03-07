const jwt = require("jsonwebtoken");
const { cuentaHelper } = require("../app/cuenta/cuenta.helper");

const VerificarToken = async (req, res, next) => {
      try{
            const token = req.headers["token"];

            if (!token) {
                  return res.status(403).json({
                        error: true,
                        msg: "No se ha entregado el token",
                  });
            }
            const verificacionJwt = jwt.verify(token, process.env.SECRET);

            if (await cuentaHelper.VerificarUsuarioSistema(verificacionJwt.id)){
                  throw new TypeError("No existe el usuario");
            }
            next();
      }catch(error){
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.authToken = {
      VerificarToken,
};
