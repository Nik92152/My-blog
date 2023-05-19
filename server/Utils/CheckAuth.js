import jwt from "jsonwebtoken"

export const checkAuth = (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')  /// Достаём токен через регулярные выражения

if (token) {
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.userID = decoded.id

        next()
    } catch (error) {
        return res.json({
            message: "No access"
        })
    }
}

}