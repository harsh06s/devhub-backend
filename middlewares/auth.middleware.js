const jwt = require ("jsonwebtoken");

exports.protect = (req,res,next) =>{

    try {

    console.log("---- MIDDLEWARE HIT ----");
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", req.headers.authorization);
    //console.log("Extracted token:", token);

    //1. token existance
    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Not authorized"});
    }
    
    //2. token display
    const token = authHeader.split(" ")[1];
    console.log("TTTTOOKKEENN", token)

    // token verification
    const decoded =jwt.verify(token, "DAY14_SECRET");
        
    //4.put decoded data in request
    req.user = decoded;
    console.log("token:", token);
    next();

    }catch (err) {
  console.log("JWT VERIFY ERROR ", err.message);
  return res.status(401).json({ message: err.message });
}

    
    /*catch (error) {
        return res.status(401).json({message:"Invalid or expired token"});
        
    }*/
}

//module.exports =authMiddleware;