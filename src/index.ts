//import package here 
import app from './server'
import * as dotenv from "dotenv";
dotenv.config();


//write code here
app.listen(3001, () => {
    console.log("Server listening on http://localhost:3001")

})