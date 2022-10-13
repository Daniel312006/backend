const app = require("./app");
const dotenv = require("dotenv").config()
const { dbConnection } = require("./database/conexion");

// inicializando el servidor
const PORT = process.env.PORT || 4000;

app.set("port", PORT)

app.listen(app.get('port'), () => {
    console.log(`Servdor en el puerto ${'http://localhost:' + PORT}`)
  })

// inicializando la base de datos
const conn = dbConnection();