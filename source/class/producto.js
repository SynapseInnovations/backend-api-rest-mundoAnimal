class Producto {
      constructor({codigo_barra, nombre, unitario, cantidad, kilo}){
            this.codigo_barra = codigo_barra,
            this.nombre = nombre,
            this.unitario = unitario,
            this.cantidad = cantidad,
            this.kilo = kilo
      }

      /*static EncriptarClave = async (clave) => {
            const salt = await bcryptjs.genSalt(parseInt(process.env.SALT));
            return await bcryptjs.hash(clave, salt);
      };*/
}

module.exports = Producto;