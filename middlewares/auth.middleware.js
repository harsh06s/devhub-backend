const jwt = require ("jsonwebtoken");

exports.protect = (req,res,next) =>{

    try {
    const authHeader = req.headers.authorization;

    //1. token existance
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Not authorized"});
    }

    //2. token display
    const token = authHeader.split("")[1];

    // token verification
    const decoded =jwt.verify(token, "DAY14_SECRET");
        
    //4.put decoded data in request
    req.user = decoded;
    
    next();

    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"});
        
    }
}

//module.exports =authMiddleware;