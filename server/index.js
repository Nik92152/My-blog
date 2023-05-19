import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from './Routes/Authtoris.js'


const app = express()
dotenv.config()


// Constants - данные 

const PORT = process.env.PORT || 3001 //  Не работают в функции start,  не заходит на сервак
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


//Middleware - ф-ия, которая или расширяет или дополняет настройки express
app.use(cors())
app.use(express.json())
app.use(express.json())
app.use(express.static('uploads'))


// Routes

app.use('/api/Authtoris', authRoute)



async function start() {
    try {
        await mongoose.connect (
            "mongodb+srv://Admin52:Qwerty-987654321@cluster0.guqzr9n.mongodb.net/Base1?retryWrites=true&w=majority",
        )
        app.listen(3002, () =>console.log(`Server стартанул  on port: ${3002}`))
    } catch (error){
        console.log(error);
    }
}
start()

app.listen(5000, () => {
console.log("Server started");
} )