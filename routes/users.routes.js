const express = require ("express");

const authMiddleware = require("../middlewares/auth.middleware.js")

const router = express.Router();

router.get("/profile",authMiddleware, (req,res)=>{
    res.json( {message:"Protected profile",
        user: req.user,
    })
});

module.exports  = router;