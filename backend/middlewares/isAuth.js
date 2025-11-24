import JsonWebToken  from "jsonwebtoken";
import "dotenv/config"
const isAuth= async(req,res,next)=>{
    try{
        const token = req.headers['authorization']?.split(' ')[1];
        // console.log(token)
        if(!token){
            // console.log(token)
            return res.status(401).json({
                message:'User not Authenticated',
                success:false
            })
        }
        const secretkey='qwerty123'
        const decode= await JsonWebToken.verify(token, secretkey)
        if(!decode){
            return res.status(401).json({
                message:'Invalid Token',
                success:false
            })
        }
        req.id= decode.userId;
        next()
    }
    catch(error){
        console.log(error);
    }
}

export default isAuth;