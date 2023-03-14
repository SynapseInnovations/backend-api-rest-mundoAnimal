const conexion = require("../../database");
const { productoHelper } = require("./producto.helper")

const Agregar = async(producto) => {
      let codigoBarra = producto.codigo_barra;
      let nombre = producto.nombre;
      let unidades = producto.unidades;
      let descripcion = producto.descripcion;
      let precioKilo = producto.precio_kilo;
      let precioUnitario = producto.precio_unitario;
      let urlImange = producto.imagen;
      let marca = producto.marca_id;
      let tipoProducto = producto.tipo_producto_id;

      if (await productoHelper.VerificarProducto(codigoBarra)) {
        throw new TypeError("El producto ya existe.");
      }

      let sql_agregarProducto = `
      INSERT INTO ${process.env.NOMBRE_BD}.Producto (codigo_barra, nombre, unidades, descripcion, precio_kilo, precio_unitario, imagen, Marcas_id_marcas, Tipoproducto_id_tipo)
      VALUES ('${codigoBarra}','${nombre}',${unidades},'${descripcion}',${precioKilo},${precioUnitario},'${urlImange}',${marca},${tipoProducto})
      `;
      return await conexion.query(sql_agregarProducto);
};

const VerProductos = async() =>{
      let sql_verProducto = `SELECT * FROM Producto`;
      return await conexion.query(sql_verProducto)
};

const Eliminar = async() => {

}

module.exports.productoModel = {
      Agregar,
      VerProductos,
      Eliminar
}