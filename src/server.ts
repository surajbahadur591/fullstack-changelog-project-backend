// import package here 
import express from 'express'
const app = express()


// write code here 
app.get('/', (req, res) => {

    console.log("Express Server is Running on port 3001")
    res.status(200)
    res.json( {
        message : "Server Running"
    })

})

export default app 