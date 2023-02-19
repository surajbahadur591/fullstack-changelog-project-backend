import jwt from 'jsonwebtoken'

export const createJWT = (user) => {


    const token = jwt.sign({ id: user.id, username: user.username },
        process.env.JWT_SECRET)

    return token

}

export const protector = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({
            message: "Not authotized to access resource"
        })
        return
    }

    const [ temp, token] = bearer.split(" ")
    if(!token) {
        res.status(401)
        res.json({
            message: "Not a valid token"
        })
        
    }

    try {
        const valid_user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = valid_user
        next()
    }
    catch(e){
        console.log(e)
        res.status(401)
        res.json({
            message: "Not a valid User"
        })
        return
    }
}