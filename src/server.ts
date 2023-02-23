// import package here 
import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

//user defined modules
import { signIn } from './handlers/userHandler';
import { createNewUser } from './handlers/userHandler';
import { protector } from './modules/auth';

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


// write code here 
app.get('/', (req, res) => {

    console.log("Express Server is Running on port 3001")
    res.status(200)
    res.json({
        message: "Server Running"
    })

})
// /api/* is protected route and only valid user can  access them
app.use('/api', protector, router)

//unprotected routes
app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app 