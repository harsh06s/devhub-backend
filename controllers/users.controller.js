const loginUser = (req,res) => {
    const{ email, password} =req.body;

    
console.log("users.controller.js loaded");

    if (!email || !password){
        return res.status(400).json({message:"Email and password required "});
    
    }
    
    return res.json({
        message: "Login Successfully (dummy)",
        user: {email},
    });
    
    }


module.exports = {loginUser};



