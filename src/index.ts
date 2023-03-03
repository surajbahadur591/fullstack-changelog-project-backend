//import package here 
import * as dotenv from "dotenv";
import config from "./config";
import app from './server'

dotenv.config();

// app is server 
//write code here
app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`)

})