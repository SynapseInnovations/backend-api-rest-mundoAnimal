//const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = require("../config");
const conexion = require("../database");

const InicializarDatabase = async()=>{
      await CrearRoles();
      await CrearMarca();
      await CrearAnimal();
      await CrearTipo();
}

const CrearRoles = async() =>{
      try{
            let sql_CantidadRoles = `SELECT COUNT(*) cantidad FROM Rol`;
            let cantidadRoles = await conexion.query(sql_CantidadRoles);
            if (cantidadRoles[0].cantidad == 0) {
                  let sql_CrearRolAdministrador = "INSERT INTO Rol (nombre, descripcion) VALUES ('Administrador','Administra las finanzas, cuentas, y otros aspectos de la empresa');";
                  let sql_CrearRolVendedor = "INSERT INTO Rol (nombre, descripcion) VALUES ('Vendedor','Toma acciones en base a la venta de productos');";
                  let sql_CrearRolInventario = "INSERT INTO Rol (nombre, descripcion) VALUES ('Inventario','Administra los productos existentes en la empresa');";
                  let sql_CrearRolUsuario = "INSERT INTO Rol (nombre, descripcion) VALUES ('Usuario','Usuario común, compra productos en línea');";
                  await conexion.query(sql_CrearRolAdministrador);
                  await conexion.query(sql_CrearRolVendedor);
                  await conexion.query(sql_CrearRolInventario);
                  await conexion.query(sql_CrearRolUsuario);
            }
      }catch(error){
            console.error(error)
      }
}

const CrearMarca = async() =>{
      try {
            let sql_CantidadMarca = `SELECT COUNT(*) cantidad FROM Marca`;
            let cantidadMarca = await conexion.query(sql_CantidadMarca);
                  if (cantidadMarca[0].cantidad == 0) {
                        let sql_CrearMarcaPurina = "INSERT INTO Marca (nombre, logo) VALUES ('Purina','https://i.imgur.com/93J2tC9.jpg');";
                        let sql_CrearMarcaChampion = "INSERT INTO Marca (nombre, logo) VALUES ('Champion','https://i.imgur.com/93J2tC9.jpg');";
                        let sql_CrearMarcaFitFormula = "INSERT INTO Marca (nombre, logo) VALUES ('Fit Formula','https://i.imgur.com/93J2tC9.jpg');";
                        let sql_CrearMarcasRoyalCanin = "INSERT INTO Marca (nombre, logo) VALUES ('Royal Canin','https://i.imgur.com/93J2tC9.jpg');";
                        await conexion.query(sql_CrearMarcaPurina);
                        await conexion.query(sql_CrearMarcaChampion);
                        await conexion.query(sql_CrearMarcaFitFormula);
                        await conexion.query(sql_CrearMarcasRoyalCanin);
                  }
      } catch (error) {
            console.error(error);
      }
}

const CrearAnimal = async() =>{
      try {
            let sql_CantidadAnimal = `SELECT COUNT(*) cantidad FROM Animal`;
            let cantidadAnimal = await conexion.query(sql_CantidadAnimal);
            if (cantidadAnimal[0].cantidad == 0) {
                  let sql_CrearAnimalPerro = "INSERT INTO Animal (nombre) VALUES ('Perro');";
                  let sql_CrearAnimalGato = "INSERT INTO Animal (nombre) VALUES ('Gato');";
                  let sql_CrearAnimalConejo = "INSERT INTO Animal (nombre) VALUES ('Conejo');"
                  await conexion.query(sql_CrearAnimalPerro);
                  await conexion.query(sql_CrearAnimalGato);
                  await conexion.query(sql_CrearAnimalConejo);
            }
      } catch (error) {
            console.error(error);
      }
}

const CrearTipo = async() =>{
      try {
            let sql_CantidaTipo = `SELECT COUNT(*) cantidad FROM Tipo`;
            let cantidadTipo = await conexion.query(sql_CantidaTipo);
            if (cantidadTipo[0].cantidad == 0) {
                  let sql_CrearTipo = "INSERT INTO Tipo (nombre) VALUES ('Comida');";
                  let sql_CrearAccesorio = "INSERT INTO Tipo (nombre) VALUES ('Accesorios');";
                  await conexion.query(sql_CrearTipo);
                  await conexion.query(sql_CrearAccesorio);
            }
      } catch (error) {
            console.error(error);
      }
}



module.exports.initialSetup = {
      InicializarDatabase,
};

