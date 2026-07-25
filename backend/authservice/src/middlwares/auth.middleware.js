import jsontoken from 'jsonwebtoken';
export const authMiddleware=(req,res,next)=>{
    const authHeader=req.get('Authorization')
    if(!authHeader){
        const error=new Error('Authorization Header Not Found!!');
        error.statusCode=401;
        throw error;
    }
    const token=req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken=jsontoken.verify(token,'aisuportsecret');
    }catch(err){
        res.status(401).json({
            status:"Not Authorized"
        });
    }
    if(!decodedToken){
        res.status(401).json({
            status:"Not Authorized"
        });
    }
    req.user=decodedToken;
    next();
}