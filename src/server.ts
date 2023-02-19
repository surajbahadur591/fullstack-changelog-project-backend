import { protector } from './modules.ts/auth';
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



app.use( ( req, res, next) => {

    req.sec = 'bosy'
    next()
})
// write code here 
app.get('/', (req, res) => {

    console.log("Express Server is Running on port 3001")
    res.status(200)
    res.json( {
        message : "Server Running"
    })

})

app.use('/api', protector,  router)

export default app 