import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;



// Middleware
app.use(cors());
app.use(express.json());
app.use('/health',(req,res)=>{
    res.status(200).json({
        staus:"Auth Service Check!!"
    });
});

export default app;