import { signIn } from './handlers/userHandler';
import { createNewUser } from './handlers/userHandler';
import { protector } from './modules/auth';
// import package here 
import express from 'express'

import router from './router'
import morgan from 'morgan'
import cors from 'cors'



const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded( { extended : true}))



// write code here 
app.get('/', (req, res) => {

    console.log("Express Server is Running on port 3001")
    res.status(200)
    res.json( {
        message : "Server Running"
    })

})

app.use('/api', protector,  router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app 