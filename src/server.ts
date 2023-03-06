// import package here 
import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { body } from 'express-validator'
import path from 'path'

//user defined modules
import { signIn } from './handlers/userHandler';
import { createNewUser } from './handlers/userHandler';
import { protector } from './modules/auth';
import { InputValidator } from './modules/middlewares'

import fs from 'fs'


const app = express()

// enabling all required access 
// cors for different url interaction 
app.use(cors())
// logging for development 
app.use(morgan('dev'))
// to accept json files 
app.use(express.json())
// to use useParams and url formatting support 
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')); 


// write code here 
app.get('/', (req, res) => {

    console.log("Express Server is Running on port 3001")
    res.status(200)
    res.json({
        message: "Server Running"
    })

})

app.get('/.well-known/pki-validation/306450B808792315E53CEE32708F819E.txt', (req, res)=> {

    res.sendFile(path.join(__dirname, 'file/306450B808792315E53CEE32708F819E.txt'))

})
// /api/* is protected route and only valid user can  access them
app.use('/api', protector, router)

//unprotected routes
app.post('/user', body('username').isLength({ min: 5 }), body('name').isString(), body('password').isString(), InputValidator, createNewUser)
app.post('/signin',body('username').isLength({ min: 5 }), body('password').isString(), InputValidator, signIn)

app.use( (err, req, res, next) => {
    if(err.type === 'auth'){
        res.status(401).json({message : 'unauthorized'})
    } else if(err.type==='input'){
        res.status(400).json({ message : 'invalid input(username exist)'})
    }
    else if(err.type==='invaliduser'){
        res.status(400).json({ message : 'No such user exists'})
    } else {
        res.status(500).json({message : 'backend'})
    }
})

export default app 