const express = require ("express");

const {protect} = require("../middlewares/auth.middleware.js")

const router = express.Router();

router.get("/profile",protect, (req,res)=>{
    res.json( {message:"Protected profile",
        user: req.user,
    })
});

module.exports  = router;