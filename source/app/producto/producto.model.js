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
      const modificarProducto = new Producto(producto)

      if(file==undefined){
            modificarProducto.imagen = "https://i.imgur.com/EBH7aDM.png";
      }else{
            modificarProducto.imagen = `${process.env.HOST}/public/productos/${file.filename}`;
      }
      
      return await modificarProducto.Modificar();
};

const VerProductos = async() =>{
      const sql_mostrarProducto = `
      SELECT P.codigo_barra, P.nombre, P.cantidad, P.descripcion, P.precio_kilo, P.precio_unitario, P.imagen, 
      C.nombre Categoria, C.id categoria_id, 
      M.nombre Marca, M.id marca_id,
      MS.nombre Mascota, MS.id mascota_id
      FROM Producto AS P
      INNER JOIN Marca AS M ON P.Marca_id = M.id
      INNER JOIN Categoria AS C ON P.Categoria_id = C.id
      INNER JOIN Mascota AS MS ON P.Mascota_id = MS.id
      `;
      return await conexion.query(sql_mostrarProducto);
};

const ObtenerMantenedor = async () => {
      const sql_obtenerMantenedor = `
      SELECT JSON_OBJECT(
            'marca', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', id, 'nombre', nombre)
              )
              FROM Marca
            ),
            'categoria', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', id, 'nombre', nombre)
              )
              FROM Categoria
            ),
            'mascota', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', id, 'nombre', nombre)
              )
              FROM Mascota
            )
          ) AS result;
      `;
      return await conexion.query(sql_obtenerMantenedor);
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
      Eliminar,
      ObtenerMantenedor
}