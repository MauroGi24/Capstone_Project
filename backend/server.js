import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import userRouter from './routes/user.route.js'
import eventRouter from './routes/event.route.js'


const server = express()    
server.use(express.json())
const port= process.env.PORT
const host= process.env.HOST 

await mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() =>
    console.log('Il database è connesso')).catch((err) => console.log(err))
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

server.on('error', (error) => {
    console.error('Server error:', error);
  });

  server.use("/users", userRouter)
  server.use("/events", eventRouter)
  
server.listen(port, () => {console.log(`Il server è partito alla porta ${port}`)})

