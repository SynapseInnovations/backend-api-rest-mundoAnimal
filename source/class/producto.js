class Producto {
      constructor({codigo_barra, nombre, unitario, cantidad, kilo}){
            this.codigo_barra = codigo_barra,
            this.nombre = nombre,
            this.unitario = unitario,
            this.cantidad = cantidad,
            this.kilo = kilo
      }
}

module.exports = Producto;