const fakeAuth = (req,res,next) => {

    const authHeader = req.headers.authorization;

    console.log ("Header Objects",req.headers );
    console.log ("Auth Header",authHeader );


//expecting authorisation bearer faketokens
    if (!authHeader|| authHeader!== "Bearer faketoken"){
        return res.status(401).json({message:"unauthorised"});
    }

    next() //allows request to continue

}

module.exports = fakeAuth;