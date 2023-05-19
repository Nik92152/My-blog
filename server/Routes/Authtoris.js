//Роуты - те же ендпоинты(конечная точка, куда отправляются запросы пользователей) - сюда будем направлять запросы пользователя( из фонта на бэк)

import {Router} from "express"
import {register,login, getMe} from "../controllers/Authtoris.js" 
import { checkAuth } from "../Utils/CheckAuth.js"
const router = new Router()

//Registration
//http://localhost:3002/api/Authtoris/register
router.post('/register', register ) // роут и ф-ия называются одинаково register

// Login
//http://localhost:3002/api/Authtoris/login
router.post('/login', login) // то же самое

// Get me
//http://localhost:3002/api/Authtoris/me
router.post('/me', checkAuth, getMe )

export default router