//import package here 
import * as dotenv from "dotenv";

import app from './server'

dotenv.config();

// app is server 
//write code here
app.listen(3001, () => {
    console.log("Server listening on http://localhost:3001")

})