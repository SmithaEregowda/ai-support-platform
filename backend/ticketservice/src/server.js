import "dotenv/config"; // Must be the first import else it won't load env variables
import { connectToDatabase } from "./config/db.js";
import app from "./app.js";

const startserver = async ()=>{
     try{
        await connectToDatabase();
        console.log("Database connected successfully!");
     }catch(err){
        console.log("Error in Connecting DB",err)
     }
     // Start server regardless of database connection status
     app.listen(process.env.PORT,()=>{
        console.log("Ticket Service is up on port " + process.env.PORT + "!!")
     })
}

startserver();
