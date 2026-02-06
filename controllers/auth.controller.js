const bcrypt = require("bcryptjs");

const generateToken = require("../utils/jwt.js");

//fake users for now
const user = {
    id : "123",
    email : "test@gmail.com",
    password : bcrypt.hashSync("123456",10)
}

exports.login = async(req,res) => {
    const {email, password} = req.body;
    if (email !==user.email){
        return res.status(401).json({message :"invalid credential"})
    }

    const isMatch = await bcrypt.compare (password, user.password);

    if (!isMatch){
        return res.status("401").json({message: "Invalid credentials"})
    }

    const token = generateToken({
        userId: user.id,
        email:user.email
    })

    res.json({token})

}