const bcrypt = require("bcryptjs");
const pool = require("../config/db.js")
const generateToken = require("../utils/jwt.js");


// SIGNUP FLOW
// 1. Check if email already exists
// 2. Hash password using bcrypt
// 3. Insert user into PostgreSQL


exports.signup = async(req,res) =>{
    try{
        const {email,password} = req.body;
        //1. user.exists?
        const result = await pool.query(
            "SELECT id FROM users WHERE email =$1",
            [email]
        );
        if (result.rows.length > 0){
            return res.status(401).json({message:"User already exists"});
        }

        //2.Hsh password
        const hashedPassword = await bcrypt.hash(password,10);

        //3.save user 
        await pool.query(
            "INSERT INTO users (email,password)VALUES ($1,$2)",
            [email,hashedPassword]
        )
        res.status(201).json({ message: "User created" });
    }
    catch (err){
        res.status(500).json({message:"Signup failed" })
    }
};


exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;
        
        //1.find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
        )

        if (result.rows.length === 0){
            return res.status(401).json({message :"invalid  lalala credential"})
        }

        const user =result.rows[0];
        
        //2. compare password
        const isMatch = await bcrypt.compare (password, user.password);


        console.log("Match result:", isMatch);       //extra addition

        if (!isMatch){
            return res.status("401").json({message: "Invalid credentials"})
        }  
        
        //3. generate token
        const token = generateToken({
            userId: user.id,
            email:user.email
        })



        res.json({token})
    } catch (err) {
  return res.status(500).json({
    message: "Login failed",
    error: err.message,
  });
}

    }
