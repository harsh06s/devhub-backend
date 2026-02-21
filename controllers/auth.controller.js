const bcrypt = require("bcryptjs");
const pool = require("../config/db.js")
const generateToken = require("../utils/jwt.js");
const catchAsync = require("../utils/catchAsync.js");
const ApiError = require("../utils/ApiError.js");



// SIGNUP FLOW
// 1. Check if email already exists
// 2. Hash password using bcrypt
// 3. Insert user into PostgreSQL


exports.signup = catchAsync(async(req,res) =>{
   
        const {email,password} = req.body;
        //1. user.exists?
        const result = await pool.query(
            "SELEC id FROM users WHERE email =$1",        ///mwommjmao
            [email]
        );

        console.log("SECRET KEY USED:", process.env.JWT_SECRET);
        if (result.rows.length > 0){
          //return res.status(401).json({message:"User already exists"});  early one
          
          return next(new ApiError(400, "User already exists with this email"))
       }

        //2.Hsh password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //3.save user 
        await pool.query(
            "INSERT INTO users (email,password)VALUES ($1,$2)",
            [email,hashedPassword]
        )
        res.status(201).json({ 
            status: "Sucess",
            message: "User created" });
    });


exports.login = catchAsync(async(req,res) => {
   
        const {email, password} = req.body;
        
        //1.find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
        )

        //if (result.rows.length === 0){
        //    return res.status(401).json({message :"invalid  lalala credential"})
        //}

        const user =result.rows[0];
        
        //2. compare password
        const isMatch = await bcrypt.compare (password, user.password);


        console.log("Match result:", isMatch);       //extra addition

        if (!isMatch){
            //return res.status("401").json({message: "Invalid credentials"})
            return next(new ApiError(401, "Invalid email or password"));
        }  
        
        //3. generate token
        const token = generateToken({
            userId: user.id,
            email:user.email
        })



        res.json({token})
    
        return res.status(200).json({
            message: "sucess",
            message: "Login successful",
            token
        });

    })
