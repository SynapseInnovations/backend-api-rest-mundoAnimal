const Producto = require("../../class/producto");
const conexion = require("../../database");

const Agregar = async(producto, file) => {
      const nuevoProducto = new Producto(producto)
      
      if (!await nuevoProducto.VerificarExistencia()) {
            throw new TypeError("El producto ya existe.");
      }

      if(file==undefined){
            nuevoProducto.imagen = "https://i.imgur.com/EBH7aDM.png";
      }else{
            nuevoProducto.imagen = `${process.env.HOST}/public/productos/${file.filename}`;
      }
      
      return await nuevoProducto.Registrar();
};

const Modificar = async(producto, file) =>{
      
};

const VerProductos = async() =>{
      const sql_mostrarProducto = `
      SELECT P.codigo_barra, P.nombre, P.unidades, P.descripcion, P.precio_kilo, P.precio_unitario, P.imagen, 
      C.nombre Categoria, C.id categoria_id, 
      M.nombre Marca, M.id marca_id
      FROM Producto AS P
      INNER JOIN Marca AS M ON P.Marca_id = M.id
      INNER JOIN Categoria AS C ON P.Categoria_id = C.id
      `;
      return await conexion.query(sql_mostrarProducto);
};

const Eliminar = async(codigo) => {
      let sql_eliminarProducto = `
      DELETE FROM Producto 
      WHERE codigo_barra = '${codigo}'`;
      return await conexion.query(sql_eliminarProducto);
}

module.exports.productoModel = {
      Agregar,
      Modificar,
      VerProductos,
      Eliminar
}