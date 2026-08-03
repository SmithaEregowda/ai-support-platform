import express from 'express';
import cors from 'cors';
import NotificationRoutes from './routes/notification.route.js';

const app = express();
const port = process.env.PORT || 8080;



// Middleware
app.use(cors());
app.use(express.json());
app.use('/health',(req,res)=>{
    res.status(200).json({
        status:"Notification Service Check!!"
    });
});
app.use('/api/notifications', NotificationRoutes);

export default app;