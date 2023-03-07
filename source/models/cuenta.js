const bcryptjs = require("bcryptjs");

const CuentaUsuario = class{
      constructor(rut, nombre, correo, clave, direccion){
            this.rut = rut;
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
            this.direccion = direccion;
      }

      static EncriptarClave = async (clave) => {
            const salt = await bcryptjs.genSalt(parseInt(process.env.SALT))
            return await bcryptjs.hash(clave, salt)
      }

      static CompararClave = async (claveUser,claveBd ) => {
            return await bcryptjs.compare(claveUser,claveBd);
      }
}

module.exports.cuentaClase = {
      CuentaUsuario
};