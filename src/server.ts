import express from "express";
import router from "./routes";
import db from './config/db'
import colors from 'colors'
import swaggerUi, { serve } from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from 'cors'
import morgan from "morgan";
//Conectar a db

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.bold('Conexion exitosa a BD'))
    } catch (error) {
        //console.log(colors.red.bold('Error a conectar en la base de datos'))
    }
}

connectDB()

//Instancia de express
const server = express()

//Permitir conexiones

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))
//Leer datos de formulario
server.use(express.json())
//ROUTING

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server