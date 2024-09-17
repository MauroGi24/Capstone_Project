import 'dotenv/config'
import express from 'express'
// import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const server = express()    
const port= process.env.PORT
const host= process.env.HOST 

// await mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() =>
//     console.log('Il database è connesso')).catch((err) => console.log(err))
server.use(morgan('dev'))
server.use(helmet())
server.use(express.json())
server.use(cors())

server.listen(port, () => {console.log(`Il server è partito alla porta ${port}`)})

