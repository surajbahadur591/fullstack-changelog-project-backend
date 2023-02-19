import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}


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

    const [, token] = bearer.split(" ")
    if(!token) {
        res.status(401)
        res.json({
            message: "Not a valid token"
        })
        return
        
    }

    try {
        const valid_user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = valid_user
        console.log(valid_user)
        next()
        return
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