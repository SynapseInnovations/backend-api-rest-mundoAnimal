const jwt = require("jsonwebtoken");
const { cuentaHelper } = require("../app/cuenta/cuenta.helper");
const Cuenta = require("../class/cuenta");

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
            req.usuarioId = verificacionJwt.id;
            if (await cuentaHelper.VerificarUsuarioSistema(verificacionJwt.id)){
                  throw new TypeError("No existe el usuario");
            }
            next();
      }catch(error){
            console.error(error)
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const VerificarUsuario = async (req,res,next) =>{
      try{
            const rolesUsuario = await Cuenta.Perfil(req.usuarioId);
            for(let i = 0; i<rolesUsuario.length ;i++){
                  if(rolesUsuario[i].rol === "Usuario"){
                        next();
                        return;
                  }
            }
            return res.status(403).json({
                  error: true,
                  msg: "Solo los Usuario pueden acceder a esta función"
            })
      }catch(error){
            console.error(error);
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
}

const VerificarAdministrador = async (req, res, next) => {
      try {
            const rolesUsuario = await Cuenta.Perfil(req.usuarioId);
            for (let i = 0; i < rolesUsuario.length; i++) {
                  if (rolesUsuario[i].rol === "Administrador") {
                        next();
                        return;
                  }
            }
            return res.status(403).json({
                  error: true,
                  msg: "Solo los Administradores pueden acceder a esta función",
            });
      } catch (error) {
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const VerificarOperador = async (req, res, next) => {
      try {
            const rolesUsuario = await Cuenta.Perfil(req.usuarioId);
            for (let i = 0; i < rolesUsuario.length; i++) {
                  if (rolesUsuario[i].rol === "Operador") {
                    next();
                    return;
                  }
            }
            return res.status(403).json({
                  error: true,
                  msg: "Solo los Operadores pueden acceder a esta función"
            });
      }catch (error) {
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const VerificarOperadorOrAdministrador = async(req, res, next) => {
      try {
            const rolesUsuario = await Cuenta.Perfil(req.usuarioId);
            for (let i = 0; i < rolesUsuario.length; i++) {
                  if (rolesUsuario[i].rol === "Operador" || rolesUsuario[i].rol === "Administrador")
                  {
                        next();
                        return;
                  }
            }
            return res.status(403).json({
                  error: true,
                  msg: "Solo los Operadores y Administradores pueden acceder a esta función",
            });
      } catch (error) {
            return res.status(401).json({
                  error: true,
                  msg: "" + error.message,
            });
      }
}

module.exports.authToken = {
      VerificarToken,
      VerificarUsuario,
      VerificarAdministrador,
      VerificarOperador,
      VerificarOperadorOrAdministrador
};
