import User from '../models/User.js'
import bcrypt from 'bcryptjs' // Для хэширования пароля
import jwt from "jsonwebtoken"
//Register user
export const register = async (req, res) => {
    try {
        const {username, password} = req.body //req(requiest)- это то, что приходит сос тосроны клиентов
                                              //res(respones - ответ, реакция с англ.) - то, что отвечает бэк пользователю
        const isUsed = await User.findOne ({username})
    
        if (isUsed) {
            return res.json({
                message: "Username is already in use"
            })
        } 
    
        const salt = bcrypt.genSaltSync(10) // Сложность хэширования пароля
        const hash = bcrypt.hashSync(password,salt)

        const newUser = new User ({
            username,
            password:hash,
        })

        const token = jwt.sign ({       // jwt - Цифровой ключ
            id: newUser._id,
            },
            process.env.JWT_SECRET,  // Ключ, благодаря которому проверяем правильность логина
            {expiresIn: "30d"},
        )   

        await newUser.save()    // Сохраняем юзера в базе данных

        res.json({
            newUser,
            token,
            message: "Registration is successfull",
        })
    } catch (error) {}  
        res.json ({message: "Registration failed"})
   
}
// Login user
export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne ({username})
        
        if (!user) {
            return res.json ({
                message:"This user doesn't exist"
            })
        }

        const isPassworrdCorrect = await bcrypt.compare(password, user.password)

        if(!isPassworrdCorrect){
            return res.json({
                message: "Wrong password",
            })
        }

        const token = jwt.sign ({       // jwt - Цифровой ключ
            id: user.id,
        },
        process.env.JWT_SECRET,  // Ключ, благодаря которому проверяем правильность логина
        {expiresIn: "30d"},
        )    

        res.json({
            token,
            user,
            message: "You entered in system",
        })


    } catch (error) {
        res.json ({message: "Authtorisation failed"})
    }
}
//Get me 

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userID)
        if (!user) {
            return res.json ({
                message:"This user doesn't exist"
            })
        }
        const token = jwt.sign ({       // jwt - Цифровой ключ
            id: user.id,

        },
        process.env.JWT_SECRET,  // Ключ, благодаря которому проверяем правильность логина
        {expiresIn: "30d"},
        ) 

        res.json ({
            user,
            token
        })
    } catch (error) {
        res.json ({message: "No acceess"})
    }
}