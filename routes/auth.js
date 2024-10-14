import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req,res,next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error: 'Access denied, no token provided'});
    }

    if(token !== Process.env.AUTH_TOKEN){
        return res.status(403).json({error:'Invalid token, access denied'})
    }

    next();
};