const express = require ("express");
const router = express.Router();

console.log("users.routes loaded");

const {loginUser} = require ("../controllers/users.controller.js");

const fakeAuth = require("../middlewares/auth.middleware.js");

router.get("/users/profile",fakeAuth, (req,res)=>{
    res.json( {message:"Protected profile data"})
});

router.post("/users/login", loginUser);

module.exports  = router;