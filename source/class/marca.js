const Marca = class{
      constructor(marca = {}){
            this.id = marca.id || null
            this.nombre = marca.nombre
            this.logo = marca.logo
      }

      GetNombre() { return this.nombre }
}
module.exports = Marca;