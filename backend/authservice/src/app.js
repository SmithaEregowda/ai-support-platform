import express from 'express';
import cors from 'cors';
import AuthRoutes from './routes/auth.route.js';
import UserRoutes from './routes/users.route.js';

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
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

export default app;