import "dotenv/config";
import express from 'express';
import cors from 'cors';
import AIRoutes from './routes/ai.routes.js';

const app = express();
const port = process.env.PORT || 8080;



// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/ai', AIRoutes);
app.use('/health',(req,res)=>{
    res.status(200).json({
        staus:"AI Service Check!!"
    });
});

app.listen(process.env.PORT,()=>{
        console.log("AI Service is up on port " + process.env.PORT + "!!")
})