const bcryptjs = require("bcryptjs");
const conexion = require("../database");
const path = require("path");
const jwt = require("jsonwebtoken");


class Cuenta {
      constructor({rut, nombre, correo, clave, direccion, imagen, Rol_id}) {
            this.rut = rut;
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
            this.direccion = direccion;
            this.imagen = imagen;
            this.Rol_id = Rol_id;
      }

      Registrar = async() => {
            const sql_RegistrarUsuario = `
            INSERT INTO Cuenta(rut, nombre, correo, clave, direccion, imagen, Rol_id)
            VALUES ('${this.rut}','${this.nombre}','${this.correo}','${await Cuenta.EncriptarClave(this.clave)}','${this.direccion}','${this.imagen}','${this.Rol_id}');
            `
            return await conexion.query(sql_RegistrarUsuario);
      };

      Modificar = async(imgModificado, pwModificado) => {
            let sql_ModificarUsuario = ` 
            UPDATE Cuenta
            SET nombre = '${this.nombre}', correo = '${this.correo}',  
            direccion = '${this.direccion}', Rol_id = '${this.Rol_id}'`
            if(pwModificado){
                  sql_ModificarUsuario += `,clave = '${await Cuenta.EncriptarClave(this.clave)}'`
            }
            if(imgModificado){
                  sql_ModificarUsuario += `,imagen = '${this.imagen}' `
            }
            sql_ModificarUsuario += `WHERE rut = '${this.rut}'`
            return await conexion.query(sql_ModificarUsuario);
      };

      static Perfil = async(rut) =>{
            const sql_DatosUsuario = `
            SELECT C.rut, C.nombre, C.correo, C.direccion, 
            C.imagen, C.clave, C.Rol_id, R.nombre rol
            FROM Cuenta AS C
            INNER JOIN Rol AS R ON R.id = C.Rol_id
            WHERE C.rut = '${rut}';
            `;
            return await conexion.query(sql_DatosUsuario)
      };

      static ListaUsuarios = async() => {
            const sql_ListaUsuarios = 
            `SELECT C.rut, C.nombre, C.correo, C.direccion, 
            C.imagen, C.clave, C.Rol_id, R.nombre rol
            FROM Cuenta AS C
            INNER JOIN Rol AS R ON R.id = C.Rol_id
            `;
            return await conexion.query(sql_ListaUsuarios);
      }

      static EncriptarClave = async (clave) => {
            const salt = await bcryptjs.genSalt(parseInt(process.env.SALT));
            return await bcryptjs.hash(clave, salt);
      };

      static CompararClave = async (claveUser, claveBd) => {
            return await bcryptjs.compare(claveUser, claveBd);
      };

      static ObtenerTokeen = async(token) =>{
            return await jwt.verify(token, process.env.SECRET)
      };
      
      static Eliminar = async(rut) =>{
            const Rol_usuario = 3; // rol usuario
            const sql_EliminarProducto = `
            UPDATE Cuenta SET Rol_id = '${Rol_usuario}'
            WHERE rut = '${rut}'
            `;
            return await conexion.query(sql_EliminarProducto)
      };
}

module.exports = Cuenta;