const express = require ("express");
const router = express.Router();

console.log("users.routes loaded");

const {loginUser} = require ("../controllers/users.controller.js");

router.post("/users/login", loginUser);

module.exports  = router;