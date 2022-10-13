const mongoose = require("mongoose")

require('dotenv').config()

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Online")
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar la BD ver logs")
    }
}

module.exports = { dbConnection }