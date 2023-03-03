import { comparePassword } from '../modules/auth';
import { createJWT } from '../modules/auth';
import { hashPassword } from '../modules/auth';
import prisma from "../db";


// function to create user - it requires prisma to initiate db conection - name, username and password is required for user creation
// returns a jst token if user creation is success 

export const createNewUser = async (req, res, next) => {


    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })

        const token = createJWT(user)
        res.json({ token })
    }
    catch (e) {
        e.type = 'input'
        next(e)
    }

}

// function to sign in user - it requires prisma to initiate db conection - username and password is required for user sign in
// returns a jst token if user sign in is success 
export const signIn = async (req, res, next) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })
    
        const isValid = await comparePassword(req.body.password, user.password)
    
        if (!isValid) {
            res.status(401)
            res.json({
                message: "Not authorized"
            })
            return
        }
    
        const token = createJWT(user)
        res.json({ token })
    } catch (error) {
        error.type = 'invaliduser'
        next(error)
    }
    
}